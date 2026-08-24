// ============================================================
// NOAH.js · System-Startpunkt · 6D NC aktiviert
// ============================================================

import { VECTOR } from './vector.energie.js';
import { SLI } from './SLI.js';
import { BRÜCKE } from './brücke.js';

export const NOAH = {
    name: 'NOAH',
    version: '6D-NC',
    status: 'initialisiert',
    vector: VECTOR,
    sli: SLI,
    brücke: BRÜCKE,
    bootLog: []
};

// ─── NOAH.boot() ─────────────────────────────────────────────
NOAH.boot = function() {
    this.log('🚀 NOAH: 6D NC System startet...');

    // Vektor aktivieren
    this.vector.pumpe(3);
    this.log(`⚡ VECTOR: Pumpe = ${this.vector.pumpe}, Wurzel = ${this.vector.wurzel}`);

    // SLI initialisieren
    this.sli.setzeWette('Systemstart', 3, 'Continuum');
    this.log(`🎲 SLI: Wette gesetzt`);

    // Brücke öffnen
    this.brücke.verbinden('OS', '243', '6D');
    this.brücke.verbinden('243', 'iki1uc', '6D');
    this.brücke.verbinden('iki1uc', 'OS', '6D');
    this.log(`🌉 BRÜCKE: 3 Verbindungen aktiv`);

    this.status = 'aktiv';
    this.log('✅ NOAH: System bereit für 6D NC Attack-Befehle');
    return this.status;
};

// ─── NOAH.attack() ───────────────────────────────────────────
NOAH.attack = function(befehl, ziel, payload = {}) {
    this.log(`⚡ NOAH: Attack-Befehl "${befehl}" an ${ziel}`);
    const result = this.brücke.attack(befehl, ziel, payload);
    return result;
};

// ─── NOAH.run() ──────────────────────────────────────────────
NOAH.run = function(kandidaten = []) {
    this.log('🔄 NOAH: Starte Pipeline mit Kandidaten...');

    if (kandidaten.length === 0) {
        kandidaten = ['a', 'b', 'c', 'y', 'x', 'z', 'q', 'd', 'f'];
    }

    // Jeder Kandidat wird zu einem Attack-Befehl
    const ergebnisse = [];
    for (let i = 0; i < kandidaten.length; i++) {
        const befehl = `NC_${kandidaten[i]}`;
        const ziel = `Ziel_${i % 3 + 1}`;
        const attack = this.attack(befehl, ziel, { kandidat: kandidaten[i] });
        ergebnisse.push(attack);
    }

    this.log(`✅ NOAH: ${ergebnisse.length} Attack-Befehle ausgeführt`);
    return ergebnisse;
};

// ─── NOAH.zeige() ────────────────────────────────────────────
NOAH.zeige = function() {
    console.log('🌍 NOAH · 6D NC System');
    console.log('─────────────────────────');
    console.log(`Status: ${this.status}`);
    console.log(`Vektor: Pumpe=${this.vector.pumpe}, Wurzel=${this.vector.wurzel}`);
    console.log(`SLI: Wette=${this.sli.wette?.name || 'keine'}`);
    console.log(`Brücke: ${this.brücke.verbindungen.length} Verbindungen`);
    console.log(`Attack-Log: ${this.brücke.attackLog.length} Einträge`);
    console.log('─────────────────────────');
};

// ─── NOAH.log() ──────────────────────────────────────────────
NOAH.log = function(entry) {
    const zeit = new Date().toISOString();
    this.bootLog.push({ zeit, entry });
    console.log(`[NOAH] ${entry}`);
};

// ─── AUTO-BOOT ──────────────────────────────────────────────
NOAH.boot();

export { NOAH };
