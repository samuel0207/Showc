// Simplificação do quadro de tipos para o MVP
const typeChart = {
    fire: { water: 0.5, grass: 2, fire: 0.5 },
    water: { fire: 2, grass: 0.5, water: 0.5 },
    grass: { water: 2, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5 },
    electric: { water: 2, grass: 0.5, electric: 0.5, ground: 0, flying: 2 },
    ground: { electric: 2, fire: 2, grass: 0.5, flying: 0, poison: 2 },
    dragon: { dragon: 2 },
    steel: { fire: 0.5, water: 0.5, electric: 0.5 },
    normal: { ghost: 0 },
    ghost: { normal: 0, ghost: 2 },
    poison: { grass: 2, poison: 0.5, ground: 0.5, ghost: 0.5 },
    flying: { grass: 2, electric: 0.5 }
};

function getEffectiveness(moveType, targetTypes) {
    let multiplier = 1;
    for (const type of targetTypes) {
        if (typeChart[moveType] && typeChart[moveType][type] !== undefined) {
            multiplier *= typeChart[moveType][type];
        }
    }
    return multiplier;
}

class Pokemon {
    constructor(data, level = 50, ability = null) {
        this.name = data.name;
        this.level = level;
        this.types = data.types;
        this.baseStats = data.stats;
        this.sprites = data.sprites;
        this.ability = ability || (data.abilities ? data.abilities[0] : null);
        
        // Cálculo simplificado de HP (Gen 5)
        this.maxHp = Math.floor(((2 * this.baseStats.hp + 31) * this.level) / 100) + this.level + 10;
        this.hp = this.maxHp;
        
        // Base stats
        this.baseAtk = Math.floor(((2 * this.baseStats.atk + 31) * this.level) / 100) + 5;
        this.baseDef = Math.floor(((2 * this.baseStats.def + 31) * this.level) / 100) + 5;
        this.baseSpa = Math.floor(((2 * this.baseStats.spa + 31) * this.level) / 100) + 5;
        this.baseSpd = Math.floor(((2 * this.baseStats.spd + 31) * this.level) / 100) + 5;
        this.baseSpe = Math.floor(((2 * this.baseStats.spe + 31) * this.level) / 100) + 5;
        
        // Estágios de Status (-6 a +6)
        this.statStages = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
        this.moves = []; 
    }

    // Calcula os stats em tempo real baseado nos estágios
    getStat(statName) {
        const stage = this.statStages[statName];
        const base = this[`base${statName.charAt(0).toUpperCase() + statName.slice(1)}`];
        
        // Modificador de estágio: Max(2, 2+estágio) / Max(2, 2-estágio)
        const modifier = stage >= 0 ? (2 + stage) / 2 : 2 / (2 - Math.abs(stage));
        return Math.floor(base * modifier);
    }

    get atk() { return this.getStat('atk'); }
    get def() { return this.getStat('def'); }
    get spa() { return this.getStat('spa'); }
    get spd() { return this.getStat('spd'); }
    get spe() { return this.getStat('spe'); }

    changeStat(statName, amount) {
        this.statStages[statName] += amount;
        if (this.statStages[statName] > 6) this.statStages[statName] = 6;
        if (this.statStages[statName] < -6) this.statStages[statName] = -6;
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp < 0) this.hp = 0;
    }

    isFainted() {
        return this.hp === 0;
    }
}

/**
 * Fórmula de dano Gen 5 usando stats já modificados
 */
function calculateDamage(attacker, defender, move) {
    const isPhysical = move.category === 'physical';
    const A = isPhysical ? attacker.atk : attacker.spa;
    const D = isPhysical ? defender.def : defender.spd;
    
    const baseDamage = Math.floor(Math.floor(Math.floor(2 * attacker.level / 5 + 2) * move.power * A / D) / 50) + 2;
    
    // Modificadores
    const isStab = attacker.types.includes(move.type) ? 1.5 : 1;
    const effectiveness = getEffectiveness(move.type, defender.types);
    const randomFactor = (Math.floor(Math.random() * 16) + 85) / 100; // 0.85 a 1.00
    
    let finalDamage = Math.floor(baseDamage * isStab * effectiveness * randomFactor);
    
    return {
        damage: finalDamage,
        effectiveness: effectiveness,
        isCrit: false
    };
}
