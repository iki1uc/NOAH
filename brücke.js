// ============================================================
// BRÜCKE.js · Verbindet Systeme · 6D NC Bridge
// ============================================================

import { VECTOR } from './vector.energie.js';
import { SLI } from './SLI.js';

export const BRÜCKE = {
    name: 'brücke',
    status: 'offen',
    verbindungen: [],
    attackLog: []
};

// Brücke: Verbindet zwei Systeme
BRÜCKE.verbinden = function(systemA, systemB, kanal = '6D') {
    const verbindung = {
        systemA,
        systemB,
        kanal,
        status: 'verbunden',
        zeit: new Date().toISOString()
    };
    this.verbindungen.push(verbindung);
    console.log(`🌉 BRÜCKE: ${systemA} ↔ ${systemB} (${kanal})`);
    return verbindung;
};

// Brücke: Führt einen Attack-Befehl aus (6D NC)
BRÜCKE.attack = function(befehl, ziel, parameter = {}) {
    const attack = VECTOR.attack(befehl, parameter);
    const wette = SLI.setzeWette(`Attack: ${befehl}`, 1, ziel);
    const slide = SLI.slide('idle', 'attack', { befehl, ziel });

    const result = {
        befehl,
        ziel,
        attack,
        wette,
        slide,
        status: 'durchgeführt',
        zeit: new Date().toISOString()
    };

    this.attackLog.push(result);
    console.log(`⚡ BRÜCKE: Attack-Befehl "${befehl}" an ${ziel} gesendet`);
    return result;
};

// Brücke: Schließt den Kreislauf (Wette → Slide → Attack)
BRÜCKE.kreislauf = function(wetteName, ziel, befehl, payload) {
    const w = SLI.setzeWette(wetteName, 1, ziel);
    const s = SLI.slide('wette', 'attack', payload);
    const a = this.attack(befehl, ziel, payload);
    return { wette: w, slide: s, attack: a, status: 'kreislauf_geschlossen' };
};

export { BRÜCKE };
