const POKEAPI_URL = 'https://pokeapi.co/api/v2';

/**
 * Busca a lista dos 151 Pokémon originais para a Pokédex
 */
async function fetchPokedexList() {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon?limit=151`);
        if (!response.ok) throw new Error('Falha ao carregar Pokédex');
        const data = await response.json();
        return data.results.map((p, index) => ({
            id: index + 1,
            name: p.name,
            // Ícone simples para a grid
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
    } catch (error) {
        console.error('Erro na API:', error);
        return [];
    }
}

/**
 * Busca os dados de um Pokémon na PokeAPI
 * @param {string|number} nameOrId - Nome ou ID do Pokémon
 * @returns {Object} Dados estruturados
 */
async function fetchPokemonData(nameOrId) {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon/${nameOrId.toString().toLowerCase()}`);
        if (!response.ok) throw new Error('Pokémon não encontrado');
        
        const data = await response.json();
        
        // Estruturar dados de forma limpa
        const structuredData = {
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name),
            abilities: data.abilities.map(a => a.ability.name),
            stats: {
                hp: data.stats.find(s => s.stat.name === 'hp').base_stat,
                atk: data.stats.find(s => s.stat.name === 'attack').base_stat,
                def: data.stats.find(s => s.stat.name === 'defense').base_stat,
                spa: data.stats.find(s => s.stat.name === 'special-attack').base_stat,
                spd: data.stats.find(s => s.stat.name === 'special-defense').base_stat,
                spe: data.stats.find(s => s.stat.name === 'speed').base_stat,
            },
            sprites: {
                front: data.sprites.versions['generation-v']['black-white'].animated.front_default || data.sprites.front_default,
                back: data.sprites.versions['generation-v']['black-white'].animated.back_default || data.sprites.back_default
            }
        };

        return structuredData;
    } catch (error) {
        console.error('Erro na API:', error);
        return null;
    }
}
