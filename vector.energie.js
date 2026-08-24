// ============================================================
// VECTOR.ENERGIE · 6D NC · Attack-Befehle
// ============================================================

// 6 Dimensionen: Ursache → Wirkung → Flow → Struktur → Energie → Ziel
export const VECTOR = {
    dimensionen: ['ursache', 'wirkung', 'flow', 'struktur', 'energie', 'ziel'],
    aktiv: false,
    pumpe: 0,
    wurzel: 0
};

// Energie-Vektor: Berechnet den Flow zwischen zwei Punkten
VECTOR.berechne = function(start, ziel) {
    const distanz = Math.abs(ziel - start);
    const energie = distanz * 0.618; // goldener Schnitt
    return {
        start,
        ziel,
        distanz,
        energie,
        status: energie > 0 ? 'flow' : 'ruhe'
    };
};

// 6D Attack: Führt einen Befehl in 6 Dimensionen aus
VECTOR.attack = function(befehl, parameter = {}) {
    console.log(`⚡ 6D NC ATTACK: ${befehl}`);
    const result = {
        befehl,
        parameter,
        dimensionen: this.dimensionen,
        status: 'ausgeführt',
        zeit: new Date().toISOString()
    };
    this.aktiv = true;
    this.pumpe += 1;
    return result;
};

// Energie-Pumpe: Aktiviert den Flow
VECTOR.pumpe = function(stärke = 1) {
    this.pumpe += stärke;
    this.wurzel = this.pumpe * 0.333;
    return { pumpe: this.pumpe, wurzel: this.wurzel };
};

export { VECTOR };
