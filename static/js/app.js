// --- Dicionário de Golpes ---
const movesByType = {
    normal: [{ name: 'Tackle', power: 40, type: 'normal', category: 'physical' }, { name: 'Quick Attack', power: 40, type: 'normal', category: 'physical' }, { name: 'Body Slam', power: 85, type: 'normal', category: 'physical' }, { name: 'Hyper Voice', power: 90, type: 'normal', category: 'special' }],
    fire: [{ name: 'Ember', power: 40, type: 'fire', category: 'special' }, { name: 'Flamethrower', power: 90, type: 'fire', category: 'special' }, { name: 'Fire Punch', power: 75, type: 'fire', category: 'physical' }, { name: 'Fire Blast', power: 110, type: 'fire', category: 'special' }],
    water: [{ name: 'Water Gun', power: 40, type: 'water', category: 'special' }, { name: 'Surf', power: 90, type: 'water', category: 'special' }, { name: 'Waterfall', power: 80, type: 'water', category: 'physical' }, { name: 'Hydro Pump', power: 110, type: 'water', category: 'special' }],
    grass: [{ name: 'Vine Whip', power: 45, type: 'grass', category: 'physical' }, { name: 'Razor Leaf', power: 55, type: 'grass', category: 'physical' }, { name: 'Energy Ball', power: 90, type: 'grass', category: 'special' }, { name: 'Seed Bomb', power: 80, type: 'grass', category: 'physical' }],
    electric: [{ name: 'Thunder Shock', power: 40, type: 'electric', category: 'special' }, { name: 'Thunderbolt', power: 90, type: 'electric', category: 'special' }, { name: 'Thunder Punch', power: 75, type: 'electric', category: 'physical' }, { name: 'Thunder', power: 110, type: 'electric', category: 'special' }],
    ice: [{ name: 'Ice Beam', power: 90, type: 'ice', category: 'special' }, { name: 'Ice Punch', power: 75, type: 'ice', category: 'physical' }, { name: 'Blizzard', power: 110, type: 'ice', category: 'special' }, { name: 'Ice Shard', power: 40, type: 'ice', category: 'physical' }],
    fighting: [{ name: 'Mach Punch', power: 40, type: 'fighting', category: 'physical' }, { name: 'Brick Break', power: 75, type: 'fighting', category: 'physical' }, { name: 'Close Combat', power: 120, type: 'fighting', category: 'physical' }, { name: 'Aura Sphere', power: 80, type: 'fighting', category: 'special' }],
    poison: [{ name: 'Poison Sting', power: 15, type: 'poison', category: 'physical' }, { name: 'Sludge Bomb', power: 90, type: 'poison', category: 'special' }, { name: 'Poison Jab', power: 80, type: 'poison', category: 'physical' }, { name: 'Gunk Shot', power: 120, type: 'poison', category: 'physical' }],
    ground: [{ name: 'Earthquake', power: 100, type: 'ground', category: 'physical' }, { name: 'Earth Power', power: 90, type: 'ground', category: 'special' }, { name: 'Bulldoze', power: 60, type: 'ground', category: 'physical' }, { name: 'Mud Shot', power: 55, type: 'ground', category: 'special' }],
    flying: [{ name: 'Peck', power: 35, type: 'flying', category: 'physical' }, { name: 'Aerial Ace', power: 60, type: 'flying', category: 'physical' }, { name: 'Air Slash', power: 75, type: 'flying', category: 'special' }, { name: 'Hurricane', power: 110, type: 'flying', category: 'special' }],
    psychic: [{ name: 'Confusion', power: 50, type: 'psychic', category: 'special' }, { name: 'Psychic', power: 90, type: 'psychic', category: 'special' }, { name: 'Zen Headbutt', power: 80, type: 'psychic', category: 'physical' }, { name: 'Psyshock', power: 80, type: 'psychic', category: 'special' }],
    bug: [{ name: 'Bug Bite', power: 60, type: 'bug', category: 'physical' }, { name: 'X-Scissor', power: 80, type: 'bug', category: 'physical' }, { name: 'Bug Buzz', power: 90, type: 'bug', category: 'special' }, { name: 'Megahorn', power: 120, type: 'bug', category: 'physical' }],
    rock: [{ name: 'Rock Throw', power: 50, type: 'rock', category: 'physical' }, { name: 'Rock Slide', power: 75, type: 'rock', category: 'physical' }, { name: 'Stone Edge', power: 100, type: 'rock', category: 'physical' }, { name: 'Power Gem', power: 80, type: 'rock', category: 'special' }],
    ghost: [{ name: 'Lick', power: 30, type: 'ghost', category: 'physical' }, { name: 'Shadow Ball', power: 80, type: 'ghost', category: 'special' }, { name: 'Shadow Claw', power: 70, type: 'ghost', category: 'physical' }, { name: 'Hex', power: 65, type: 'ghost', category: 'special' }],
    dragon: [{ name: 'Dragon Rage', power: 40, type: 'dragon', category: 'special' }, { name: 'Dragon Claw', power: 80, type: 'dragon', category: 'physical' }, { name: 'Dragon Pulse', power: 85, type: 'dragon', category: 'special' }, { name: 'Outrage', power: 120, type: 'dragon', category: 'physical' }],
    dark: [{ name: 'Bite', power: 60, type: 'dark', category: 'physical' }, { name: 'Crunch', power: 80, type: 'dark', category: 'physical' }, { name: 'Dark Pulse', power: 80, type: 'dark', category: 'special' }, { name: 'Foul Play', power: 95, type: 'dark', category: 'physical' }],
    steel: [{ name: 'Metal Claw', power: 50, type: 'steel', category: 'physical' }, { name: 'Iron Head', power: 80, type: 'steel', category: 'physical' }, { name: 'Flash Cannon', power: 80, type: 'steel', category: 'special' }, { name: 'Iron Tail', power: 100, type: 'steel', category: 'physical' }],
    fairy: [{ name: 'Fairy Wind', power: 40, type: 'fairy', category: 'special' }, { name: 'Dazzling Gleam', power: 80, type: 'fairy', category: 'special' }, { name: 'Play Rough', power: 90, type: 'fairy', category: 'physical' }, { name: 'Moonblast', power: 95, type: 'fairy', category: 'special' }]
};

function generateMovesFor(types) {
    const pickRandom = (arr, count) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
    let selectedMoves = [];
    const pType = types[0];
    const sType = types.length > 1 ? types[1] : 'normal';

    const pMoves = movesByType[pType] || movesByType['normal'];
    const sMoves = movesByType[sType] || movesByType['normal'];

    if (pType === sType || types.length === 1) {
        selectedMoves = [...pickRandom(pMoves, 3), ...pickRandom(movesByType['normal'], 1)];
    } else {
        selectedMoves = [...pickRandom(pMoves, 2), ...pickRandom(sMoves, 2)];
    }
    return selectedMoves;
}

// --- Multiplayer Socket.IO Setup ---
const socket = io();

// --- Globals ---
let username = "";
let playerScore = 0;
let playerTeamIds = [];
let userHistory = [];
let userUsage = {};
let currentRoom = null;
let isPlayerOne = false;

// Estado de Batalha
let myTeam = [];
let oppTeam = [];
let myActiveIdx = 0;
let oppActiveIdx = 0;
let isBattleOver = false;

// Elementos DOM
const dom = {
    loginScreen: document.getElementById('login-screen'),
    lobbyScreen: document.getElementById('lobby-screen'),
    battleScreen: document.getElementById('battle-screen'),
    resultScreen: document.getElementById('result-screen'),
    profileModal: document.getElementById('profile-modal'),
    adminModal: document.getElementById('admin-modal'),
    
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    
    loginBtn: document.getElementById('login-btn'),
    loginUserInput: document.getElementById('login-username'),
    loginPassInput: document.getElementById('login-password'),
    loginError: document.getElementById('login-error'),
    
    registerBtn: document.getElementById('register-btn'),
    registerUserInput: document.getElementById('register-username'),
    registerEmailInput: document.getElementById('register-email'),
    registerPassInput: document.getElementById('register-password'),
    registerError: document.getElementById('register-error'),
    
    showRegisterBtn: document.getElementById('show-register'),
    showLoginBtn: document.getElementById('show-login'),
    onlineCount: document.getElementById('online-count'),


    scoreDisplay: document.getElementById('player-score'),
    loggedUser: document.getElementById('logged-user'),
    leaderboardList: document.getElementById('leaderboard-list'),
    
    pokedexGrid: document.getElementById('pokedex-grid'),
    teamSlots: document.getElementById('team-slots').children,
    saveTeamBtn: document.getElementById('save-team-btn'),
    findMatchBtn: document.getElementById('find-match-btn'),
    cancelMatchBtn: document.getElementById('cancel-match-btn'),
    
    log: document.getElementById('console-log'),
    commands: document.getElementById('commands-grid'),
    
    player: {
        name: document.getElementById('player-name'),
        hpBar: document.getElementById('player-hp-bar'),
        hpText: document.getElementById('player-hp-text'),
        sprite: document.getElementById('player-sprite'),
        dmgContainer: document.getElementById('player-damage-container'),
        statContainer: document.getElementById('player-stat-indicators'),
        teamDots: document.getElementById('player-team-status')
    },
    opponent: {
        name: document.getElementById('opp-name'),
        hpBar: document.getElementById('opp-hp-bar'),
        sprite: document.getElementById('opp-sprite'),
        dmgContainer: document.getElementById('opp-damage-container'),
        statContainer: document.getElementById('opp-stat-indicators'),
        teamDots: document.getElementById('opp-team-status')
    }
};

const pokedexListCache = [];
const pokemonCache = {};

window.onload = async () => {
    // Carrega Pokedex via API
    const list = await fetchPokedexList();
    pokedexListCache.push(...list);
    renderPokedex(list);
    
    // Auto Login (Persistencia)
    const savedUser = localStorage.getItem('poke_user');
    const savedPass = localStorage.getItem('poke_pass');
    if(savedUser && savedPass) {
        socket.emit('login', {username: savedUser, password: savedPass, auto: true});
    }
};

// --- TOGGLE AUTH SCREENS ---
dom.showRegisterBtn.onclick = (e) => {
    e.preventDefault();
    dom.loginForm.style.display = 'none';
    dom.registerForm.style.display = 'flex';
    dom.loginError.innerText = "";
    document.getElementById('auth-subtitle').innerText = "Crie sua conta";
};

dom.showLoginBtn.onclick = (e) => {
    e.preventDefault();
    dom.registerForm.style.display = 'none';
    dom.loginForm.style.display = 'flex';
    dom.registerError.innerText = "";
    document.getElementById('auth-subtitle').innerText = "Faça login na sua conta";
};

// --- LOGIN FLOW ---
dom.loginBtn.onclick = () => {
    const user = dom.loginUserInput.value.trim();
    const pass = dom.loginPassInput.value.trim();
    if(user && pass) {
        socket.emit('login', {username: user, password: pass});
    }
};

dom.registerBtn.onclick = () => {
    const user = dom.registerUserInput.value.trim();
    const email = dom.registerEmailInput.value.trim();
    const pass = dom.registerPassInput.value.trim();
    if(user && email && pass) {
        socket.emit('register', {username: user, password: pass, email: email});
    }
};

socket.on('login_error', (data) => {
    if(dom.verifyModal && dom.verifyModal.classList.contains('active')) {
        dom.verifyError.innerText = data.msg;
    } else {
        if(dom.registerForm.style.display === 'flex') {
            dom.registerError.innerText = data.msg;
        } else {
            dom.loginError.innerText = data.msg;
        }
    }
    localStorage.removeItem('poke_user');
    localStorage.removeItem('poke_pass');
});

socket.on('login_success', (data) => {
    
    username = data.username;
    playerScore = data.score;
    playerTeamIds = data.team || [];
    userHistory = data.history || [];
    userUsage = data.usage || {};
    
    // Save to localStorage
    if(!localStorage.getItem('poke_user')) {
        localStorage.setItem('poke_user', username);
        localStorage.setItem('poke_pass', dom.loginPassInput.value.trim() || dom.registerPassInput.value.trim() || "");
    }
    
    dom.loggedUser.innerText = username;
    dom.scoreDisplay.innerText = playerScore;
    
    if(data.is_admin) {
        document.getElementById('btn-admin').style.display = 'block';
    }
    
    renderLeaderboard(data.leaderboard);
    renderTeamBuilder();

    dom.loginScreen.classList.remove('active');
    dom.lobbyScreen.classList.add('active');
});

document.getElementById('btn-logout').onclick = () => {
    localStorage.removeItem('poke_user');
    localStorage.removeItem('poke_pass');
    location.reload();
};

// --- LEADERBOARD & REAL-TIME UPDATES ---
function renderLeaderboard(lb) {
    dom.leaderboardList.innerHTML = '';
    lb.forEach((entry, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="clickable-username">${idx+1}. ${entry.username}</span><span>${entry.score} pts</span>`;
        li.querySelector('.clickable-username').onclick = () => {
            socket.emit('get_user_profile', {username: entry.username});
        };
        dom.leaderboardList.appendChild(li);
    });
}

socket.on('leaderboard_update', (data) => {
    renderLeaderboard(data);
    // Atualiza próprio score se estiver na lista
    const me = data.find(x => x.username === username);
    if(me) {
        playerScore = me.score;
        dom.scoreDisplay.innerText = playerScore;
    }
});

// --- PROFILE & ADMIN ---
function showProfileModal(name, history, usage) {
    dom.profileModal.classList.add('active');
    document.querySelector('#profile-modal h2').innerText = `Perfil de ${name}`;
    
    const histUl = document.getElementById('profile-history');
    histUl.innerHTML = history.length === 0 ? '<li>Nenhuma partida jogada ainda.</li>' : '';
    [...history].reverse().forEach(h => {
        const color = h.result === 'Vitória' ? '#48d0b0' : '#e3350d';
        histUl.innerHTML += `<li><strong style="color:${color}">${h.result}</strong> vs ${h.opponent} <span style="color:#777">(${h.date})</span></li>`;
    });
    
    const usgUl = document.getElementById('profile-usage');
    if(Object.keys(usage).length === 0) {
        usgUl.innerHTML = '<li>Nenhum dado.</li>';
    } else {
        const sortedUsage = Object.entries(usage).sort((a,b) => b[1] - a[1]).slice(0,5);
        usgUl.innerHTML = '';
        sortedUsage.forEach(([id, count]) => {
            const pkName = pokedexListCache.find(p => p.id == id)?.name || id;
            usgUl.innerHTML += `<li>${pkName.toUpperCase()}: Usado ${count}x</li>`;
        });
    }
}

document.getElementById('btn-profile').onclick = () => {
    showProfileModal(username, userHistory, userUsage);
};

socket.on('user_profile_data', (data) => {
    showProfileModal(data.username, data.history, data.usage);
});

document.getElementById('btn-close-profile').onclick = () => dom.profileModal.classList.remove('active');

document.getElementById('btn-admin').onclick = () => {
    dom.adminModal.classList.add('active');
    socket.emit('get_admin_data');
};
document.getElementById('btn-close-admin').onclick = () => dom.adminModal.classList.remove('active');

socket.on('admin_data_response', (users) => {
    const list = document.getElementById('admin-user-list');
    list.innerHTML = '';
    users.forEach(u => {
        if(u.username === 'admin') return;
        const li = document.createElement('li');
        li.innerHTML = `<span><b>${u.username}</b> | ${u.score} pts | ${u.team_size} pkmns</span>
            <div>
                <button class="secondary-btn" onclick="socket.emit('admin_action', {action:'reset', target:'${u.username}'})">Zerar</button>
                <button class="secondary-btn" style="background:#e3350d; border-color:#900;" onclick="socket.emit('admin_action', {action:'delete', target:'${u.username}'})">Excluir</button>
            </div>`;
        list.appendChild(li);
    });
});

// --- LOBBY FLOW ---
function renderPokedex(list) {
    dom.pokedexGrid.innerHTML = '';
    list.forEach(poke => {
        const card = document.createElement('div');
        card.className = 'pokedex-card';
        card.innerHTML = `<img src="${poke.sprite}" loading="lazy"><span>${poke.name}</span>`;
        card.onclick = () => addToTeam(poke.id, poke.sprite);
        dom.pokedexGrid.appendChild(card);
    });
}

function renderTeamBuilder() {
    for(let i=0; i<6; i++) {
        const slot = dom.teamSlots[i];
        slot.innerHTML = '';
        if (playerTeamIds[i]) {
            const poke = pokedexListCache.find(p => p.id === playerTeamIds[i]);
            if(poke) {
                slot.innerHTML = `<img src="${poke.sprite}">`;
                slot.classList.remove('empty');
            }
        } else {
            slot.classList.add('empty');
        }
        slot.onclick = () => removeFromTeam(i);
    }
}

function addToTeam(id) {
    if(playerTeamIds.length < 6) {
        playerTeamIds.push(id);
        renderTeamBuilder();
    }
}

function removeFromTeam(idx) {
    if(playerTeamIds[idx]) {
        playerTeamIds.splice(idx, 1);
        renderTeamBuilder();
    }
}

dom.saveTeamBtn.onclick = () => {
    if(playerTeamIds.length === 0) {
        alert("Escolha pelo menos 1 Pokémon para o seu time!");
        return;
    }
    socket.emit('save_team', {team: playerTeamIds});
};

socket.on('team_saved', (data) => {
    alert(data.msg);
    if(data.usage) userUsage = data.usage;
});

let matchTimer = null;
let matchSeconds = 0;

function resetMatchUI() {
    clearInterval(matchTimer);
    dom.findMatchBtn.innerText = "Procurar Partida Online";
    dom.findMatchBtn.disabled = false;
    dom.cancelMatchBtn.style.display = 'none';
}

dom.findMatchBtn.onclick = () => {
    matchSeconds = 0;
    dom.findMatchBtn.innerText = "Buscando oponente... (00:00)";
    dom.findMatchBtn.disabled = true;
    dom.cancelMatchBtn.style.display = 'block';
    
    matchTimer = setInterval(() => {
        matchSeconds++;
        let m = String(Math.floor(matchSeconds / 60)).padStart(2, '0');
        let s = String(matchSeconds % 60).padStart(2, '0');
        dom.findMatchBtn.innerText = `Buscando oponente... (${m}:${s})`;
    }, 1000);
    
    socket.emit('find_match');
};

dom.cancelMatchBtn.onclick = () => {
    socket.emit('cancel_match');
    resetMatchUI();
};

socket.on('match_error', data => {
    resetMatchUI();
    alert(data.msg);
});

socket.on('online_count_update', data => {
    if(dom.onlineCount) {
        dom.onlineCount.innerText = `🟢 Online: ${data.count}`;
    }
});

// --- BATTLE PREP ---
async function buildTeam(ids) {
    const team = [];
    for(let id of ids) {
        if (!pokemonCache[id]) pokemonCache[id] = await fetchPokemonData(id);
        const p = new Pokemon(pokemonCache[id], 50);
        p.moves = generateMovesFor(p.types);
        team.push(p);
    }
    return team;
}

socket.on('match_found', async (data) => {
    resetMatchUI();

    currentRoom = data.room;
    isPlayerOne = data.is_player_one;
    
    myTeam = await buildTeam(playerTeamIds);
    oppTeam = await buildTeam(data.opponent_team);
    myActiveIdx = 0;
    oppActiveIdx = 0;
    isBattleOver = false;

    dom.lobbyScreen.classList.remove('active');
    dom.battleScreen.classList.add('active');
    dom.log.innerHTML = '';

    setupPokemonUI(myTeam[myActiveIdx], 'player', myTeam);
    setupPokemonUI(oppTeam[oppActiveIdx], 'opponent', oppTeam);
    setupCommands();

    logMsg(`Partida encontrada contra ${data.opponent}!`);
    await sleep(1000);

    await triggerEntryAbilities(myTeam[myActiveIdx], oppTeam[oppActiveIdx], 'player', 'opponent');
    await triggerEntryAbilities(oppTeam[oppActiveIdx], myTeam[myActiveIdx], 'opponent', 'player');
});

socket.on('opponent_disconnected', () => {
    if(!isBattleOver) {
        alert("O oponente se desconectou. Você venceu por W.O.!");
        // The server deletes the room automatically. We just show result.
    }
});

// --- UI HELPERS ---
function setupPokemonUI(pokemon, side, team) {
    dom[side].name.innerText = pokemon.name.toUpperCase();
    dom[side].sprite.src = side === 'player' ? pokemon.sprites.back : pokemon.sprites.front;
    dom[side].statContainer.innerHTML = '';
    updateHpBar(pokemon, side);
    renderTeamDots(side, team);
}

function renderTeamDots(side, team) {
    const container = dom[side].teamDots;
    container.innerHTML = '';
    team.forEach(p => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (p.isFainted() ? ' fainted' : '');
        container.appendChild(dot);
    });
}

function logMsg(msg) {
    dom.log.innerHTML += `<p>> ${msg}</p>`;
    dom.log.scrollTop = dom.log.scrollHeight;
}

function updateHpBar(pokemon, side) {
    const percentage = (pokemon.hp / pokemon.maxHp) * 100;
    const bar = dom[side].hpBar;
    bar.style.width = `${percentage}%`;
    bar.className = 'hp-bar ' + (percentage > 50 ? 'green' : percentage > 20 ? 'yellow' : 'red');
    if (side === 'player') dom.player.hpText.innerText = `${pokemon.hp} / ${pokemon.maxHp}`;
}

function showDamage(amount, side) {
    const container = dom[side].dmgContainer;
    const text = document.createElement('div');
    text.className = 'damage-text';
    text.innerText = `-${amount}`;
    container.appendChild(text);
    setTimeout(() => { if(container.contains(text)) container.removeChild(text); }, 1500);
}

function setupCommands() {
    dom.commands.innerHTML = '';
    const p = myTeam[myActiveIdx];
    p.moves.forEach((move, idx) => {
        const btn = document.createElement('button');
        btn.className = 'move-btn';
        btn.innerText = move.name;
        btn.onclick = () => {
            disableCommands(true);
            socket.emit('action', {room: currentRoom, action: {type: 'attack', moveIndex: idx}});
        };
        dom.commands.appendChild(btn);
    });
}

function disableCommands(disable) {
    dom.commands.querySelectorAll('.move-btn').forEach(btn => btn.disabled = disable);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// --- RESOLUÇÃO DE TURNO ONLINE ---
socket.on('turn_ready', async (actions) => {
    if(isBattleOver) return;

    const myId = socket.id;
    const myAction = actions[myId];
    const oppAction = Object.values(actions).find(a => a !== myAction) || actions[Object.keys(actions).find(k => k !== myId)];

    const myPkmn = myTeam[myActiveIdx];
    const oppPkmn = oppTeam[oppActiveIdx];
    
    const myMove = myPkmn.moves[myAction.moveIndex];
    const oppMove = oppPkmn.moves[oppAction.moveIndex];

    let first, second;
    if (myPkmn.spe >= oppPkmn.spe) {
        first = { pkmn: myPkmn, side: 'player', move: myMove, defPkmn: oppPkmn, defSide: 'opponent' };
        second = { pkmn: oppPkmn, side: 'opponent', move: oppMove, defPkmn: myPkmn, defSide: 'player' };
    } else {
        first = { pkmn: oppPkmn, side: 'opponent', move: oppMove, defPkmn: myPkmn, defSide: 'player' };
        second = { pkmn: myPkmn, side: 'player', move: myMove, defPkmn: oppPkmn, defSide: 'opponent' };
    }

    await performAttack(first.pkmn, first.defPkmn, first.move, first.defSide);
    
    if (first.defPkmn.isFainted()) await handleFaint(first.defSide);
    else {
        await performAttack(second.pkmn, second.defPkmn, second.move, second.defSide);
        if (second.defPkmn.isFainted()) await handleFaint(second.defSide);
    }

    if(!isBattleOver) disableCommands(false);
});

async function performAttack(attacker, defender, move, defSide) {
    logMsg(`${attacker.name.toUpperCase()} usou ${move.name}!`);
    await sleep(800);

    const result = calculateDamage(attacker, defender, move);
    defender.takeDamage(result.damage);
    showDamage(result.damage, defSide);
    updateHpBar(defender, defSide);

    if (result.effectiveness > 1) { logMsg("É super efetivo!"); await sleep(800); }
    else if (result.effectiveness < 1 && result.effectiveness > 0) { logMsg("Não é muito efetivo..."); await sleep(800); }
    else if (result.effectiveness === 0) { logMsg(`Não afetou...`); await sleep(800); }

    if (defender.isFainted()) {
        logMsg(`${defender.name.toUpperCase()} desmaiou!`);
        await sleep(1000);
    }
}

async function handleFaint(faintedSide) {
    if(faintedSide === 'player') {
        const nextIdx = myTeam.findIndex(p => !p.isFainted());
        if(nextIdx !== -1) {
            myActiveIdx = nextIdx;
            logMsg(`Você enviou ${myTeam[myActiveIdx].name.toUpperCase()}!`);
            setupPokemonUI(myTeam[myActiveIdx], 'player', myTeam);
            setupCommands();
            await sleep(1000);
        } else {
            socket.emit('end_game', {room: currentRoom, result: 'loss'});
            logMsg("Você perdeu a batalha!");
            await sleep(1000);
        }
    } else {
        const nextIdx = oppTeam.findIndex(p => !p.isFainted());
        if(nextIdx !== -1) {
            oppActiveIdx = nextIdx;
            logMsg(`Oponente enviou ${oppTeam[oppActiveIdx].name.toUpperCase()}!`);
            setupPokemonUI(oppTeam[oppActiveIdx], 'opponent', oppTeam);
            await sleep(1000);
        } else {
            // Se eu percebo que ele morreu todo, eu espero ele dizer 'loss' ou eu digo 'win'.
            // Para não haver race condition, apenas quem PERDE envia o end_game!
            logMsg("Você venceu a batalha! Aguardando servidor...");
        }
    }
}

// NOVO: Receber o Game Over global
socket.on('game_over', (data) => {
    isBattleOver = true;
    
    // Identificar se ganhamos ou perdemos
    const iWon = (data.winner === username);
    
    const resultBox = document.querySelector('.result-box');
    const resultTitle = document.getElementById('result-title');
    const resultPoints = document.getElementById('result-points');
    
    if(iWon) {
        resultTitle.innerText = "Vitória!";
        resultPoints.innerText = `+${data.points_win} Pontos`;
        resultBox.className = 'result-box win';
    } else {
        resultTitle.innerText = "Derrota!";
        resultPoints.innerText = `${data.points_loss} Pontos`;
        resultBox.className = 'result-box loss';
    }
    
    // Atualiza histórico localmente para ficar rápido
    userHistory.push({
        result: iWon ? 'Vitória' : 'Derrota',
        opponent: 'Oponente',
        date: new Date().toLocaleString()
    });
    
    dom.resultScreen.classList.add('active');
});

document.getElementById('btn-back-lobby').onclick = () => {
    dom.resultScreen.classList.remove('active');
    dom.battleScreen.classList.remove('active');
    dom.lobbyScreen.classList.add('active');
    dom.findMatchBtn.innerText = "Procurar Partida Online";
    dom.findMatchBtn.disabled = false;
};

async function triggerEntryAbilities(source, target, srcSide, tgtSide) {
    const ab = source.ability;
    if (ab === 'intimidate') {
        logMsg(`[Hab.] Intimidate de ${source.name.toUpperCase()}!`);
        target.changeStat('atk', -1);
        await sleep(1000);
    }
}
