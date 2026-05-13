from gevent import monkey
monkey.patch_all()

import os
import random
from datetime import datetime
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room, leave_room
from supabase import create_client, Client

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SECRET_KEY'] = 'pokemon-secret-123!'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='gevent')

# --- SUPABASE SETUP ---
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://ayfbuxpttvsjhqfebrvt.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5ZmJ1eHB0dHZzamhxZmVicnZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODIzMTY5OSwiZXhwIjoyMDkzODA3Njk5fQ.lr8dZjU0A2oBVgtQkH0rT5_9edUSdUhB-hz4YsYAPTY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- HELPER FUNCTIONS ---
def get_user(username):
    res = supabase.table('users').select('*').eq('username', username).execute()
    return res.data[0] if res.data else None

def upsert_user(user_data):
    supabase.table('users').upsert(user_data).execute()

def get_all_users():
    return supabase.table('users').select('*').execute().data

def get_leaderboard():
    res = supabase.table('users').select('username, score').order('score', desc=True).limit(10).execute()
    return res.data

# --- ROUTES & SOCKETS ---
@app.route('/')
def index():
    return render_template('index.html')

waiting_players = []
sid_to_user = {}
games = {}
pending_verifications = {}

@socketio.on('login')
def handle_login(data):
    username = data.get('username')
    password = data.get('password')
    is_auto = data.get('auto', False)
    
    if not username or not password:
        if not is_auto: emit('login_error', {'msg': 'Preencha todos os campos'})
        return
        
    if username.lower() == 'admin' and password != '153624':
        if not is_auto: emit('login_error', {'msg': 'Senha de administrador incorreta!'})
        return
        
    user = get_user(username)
    
    if user:
        if user['password'] != password:
            if not is_auto: emit('login_error', {'msg': 'Senha incorreta'})
            return
    else:
        if is_auto:
            emit('login_error', {'msg': 'Sessão inválida'})
        else:
            emit('login_error', {'msg': 'Conta não encontrada. Faça o cadastro.'})
        return
        
    sid_to_user[request.sid] = username
    
    emit('login_success', {
        'username': username,
        'score': user.get('score', 1000),
        'team': user.get('team', []),
        'history': user.get('history', [])[-5:],
        'usage': user.get('usage', {}),
        'is_admin': (username.lower() == 'admin'),
        'leaderboard': get_leaderboard()
    })

@socketio.on('register')
def handle_register(data):
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    
    if not username or not password or not email:
        emit('login_error', {'msg': 'Preencha todos os campos de cadastro'})
        return
        
    user = get_user(username)
    if user:
        emit('login_error', {'msg': 'Este nome de usuário já está em uso.'})
        return
        
    # Simula o envio do código via E-mail
    import random
    code = str(random.randint(100000, 999999))
    print(f"\n[E-MAIL SIMULADO] Código {code} gerado para o e-mail {email} (usuário: {username})\n")
    
    pending_verifications[request.sid] = {
        'username': username,
        'password': password,
        'email': email,
        'code': code
    }
    
    emit('verification_required', {'msg': f'Código enviado para {email}'})

@socketio.on('verify_code')
def handle_verify_code(data):
    sid = request.sid
    code = data.get('code')
    pending = pending_verifications.get(sid)
    
    if not pending:
        emit('login_error', {'msg': 'Nenhuma verificação pendente encontrada.'})
        return
        
    if pending['code'] != code:
        emit('login_error', {'msg': 'Código de verificação incorreto.'})
        return
        
    user = {
        'username': pending['username'],
        'password': pending['password'],
        'score': 1000,
        'team': [],
        'history': [],
        'usage': {}
    }
    
    try:
        upsert_user(user)
    except Exception as e:
        print(f"[ERRO] Falha ao criar usuário: {e}")
        emit('login_error', {'msg': 'Erro ao salvar no banco. O RLS está bloqueando?'})
        return
        
    del pending_verifications[sid]
    sid_to_user[sid] = user['username']
    
    emit('login_success', {
        'username': user['username'],
        'score': user['score'],
        'team': user['team'],
        'history': user['history'],
        'usage': user['usage'],
        'is_admin': (user['username'].lower() == 'admin'),
        'leaderboard': get_leaderboard()
    })

@socketio.on('get_admin_data')
def get_admin_data():
    if sid_to_user.get(request.sid) != 'admin': return
    users = get_all_users()
    user_list = [{'username': u['username'], 'score': u['score'], 'team_size': len(u.get('team', []))} for u in users]
    emit('admin_data_response', user_list)

@socketio.on('admin_action')
def admin_action(data):
    if sid_to_user.get(request.sid) != 'admin': return
    action = data.get('action')
    target = data.get('target')
    
    if target == 'admin': return
    
    if action == 'delete':
        supabase.table('users').delete().eq('username', target).execute()
    elif action == 'reset':
        user = get_user(target)
        if user:
            user['score'] = 1000
            upsert_user(user)
            
    get_admin_data()
    socketio.emit('leaderboard_update', get_leaderboard())

@socketio.on('get_user_profile')
def get_user_profile(data):
    target = data.get('username')
    user = get_user(target)
    if user:
        emit('user_profile_data', {
            'username': target,
            'history': user.get('history', [])[-5:],
            'usage': user.get('usage', {})
        })

@socketio.on('save_team')
def handle_save_team(data):
    username = sid_to_user.get(request.sid)
    if not username: return
    team = data.get('team', [])
    
    user = get_user(username)
    if not user: return
    
    user['team'] = team
    usage = user.get('usage', {})
    
    for poke_id in team:
        poke_str = str(poke_id)
        usage[poke_str] = usage.get(poke_str, 0) + 1
        
    user['usage'] = usage
    try:
        upsert_user(user)
    except Exception as e:
        print(f"[ERRO] Falha ao salvar time: {e}")
        emit('team_saved', {'msg': 'Erro ao salvar time no servidor!', 'usage': usage})
        return
    
    emit('team_saved', {'msg': 'Time salvo com sucesso!', 'usage': usage})

@socketio.on('find_match')
def handle_find_match():
    sid = request.sid
    username = sid_to_user.get(sid)
    if not username: return
    
    user = get_user(username)
    team = user.get('team', [])
    if not team or len(team) == 0:
        emit('match_error', {'msg': 'Você precisa montar e salvar um time antes de jogar!'})
        return

    if waiting_players and waiting_players[0] != sid:
        opponent_sid = waiting_players.pop(0)
        room = f"room_{opponent_sid}_{sid}"
        join_room(room)
        join_room(room, sid=opponent_sid)
        
        games[room] = {
            'players': [sid, opponent_sid],
            'turn_actions': {}
        }
        
        opp_username = sid_to_user[opponent_sid]
        opp_user = get_user(opp_username)
        
        socketio.emit('match_found', {
            'room': room,
            'opponent': opp_username,
            'opponent_team': opp_user.get('team', []),
            'is_player_one': False
        }, to=sid)
        
        socketio.emit('match_found', {
            'room': room,
            'opponent': username,
            'opponent_team': team,
            'is_player_one': True
        }, to=opponent_sid)
    else:
        if sid not in waiting_players:
            waiting_players.append(sid)
        emit('waiting_match')

@socketio.on('action')
def handle_action(data):
    sid = request.sid
    room = data.get('room')
    action = data.get('action') 
    
    if room not in games: return
    game = games[room]
    
    game['turn_actions'][sid] = action
    
    if len(game['turn_actions']) == 2:
        socketio.emit('turn_ready', game['turn_actions'], to=room)
        game['turn_actions'] = {}

@socketio.on('end_game')
def handle_end_game(data):
    sid = request.sid
    room = data.get('room')
    result = data.get('result') 
    
    if room not in games: return
    game = games[room]
    
    username = sid_to_user.get(sid)
    opp_sid = [s for s in game['players'] if s != sid][0]
    opp_username = sid_to_user.get(opp_sid)
    
    date_str = datetime.now().strftime("%d/%m/%Y %H:%M")
    
    winner_name = opp_username if result == 'loss' else username
    loser_name = username if result == 'loss' else opp_username
    
    points_win = 15
    points_loss = -10
    
    winner_user = get_user(winner_name)
    if winner_user:
        winner_user['score'] = winner_user.get('score', 1000) + points_win
        hist = winner_user.get('history', [])
        hist.append({'result': 'Vitória', 'opponent': loser_name, 'date': date_str})
        winner_user['history'] = hist
        try:
            upsert_user(winner_user)
        except Exception as e:
            print(f"[ERRO] Falha ao atualizar vencedor: {e}")
        
    loser_user = get_user(loser_name)
    if loser_user:
        loser_user['score'] = max(0, loser_user.get('score', 1000) + points_loss)
        hist = loser_user.get('history', [])
        hist.append({'result': 'Derrota', 'opponent': winner_name, 'date': date_str})
        loser_user['history'] = hist
        try:
            upsert_user(loser_user)
        except Exception as e:
            print(f"[ERRO] Falha ao atualizar perdedor: {e}")
    
    socketio.emit('game_over', {
        'winner': winner_name,
        'points_win': points_win,
        'points_loss': points_loss
    }, to=room)
    
    socketio.emit('leaderboard_update', get_leaderboard())
    del games[room]

@socketio.on('disconnect')
def handle_disconnect():
    sid = request.sid
    if sid in waiting_players:
        waiting_players.remove(sid)
    for room, game in list(games.items()):
        if sid in game['players']:
            handle_end_game({'room': room, 'result': 'loss'})
            break
            
    if sid in sid_to_user:
        del sid_to_user[sid]

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3000))
    socketio.run(app, host='0.0.0.0', port=port, debug=False)
