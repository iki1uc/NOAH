/* ═══════════════════════════════════════════════════════════
   Bridge.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Dieser Code ist vorläufig.
   Er ist funktional, aber nicht final.
   Er gilt nur, solange die Bedingungen gelten.

   Was er tut:
     - importiert die fünf Atome
     - stellt sie unter window.BRIDGE bereit
     - gibt seinen Status zurück (tmp · wahrheit)

   Was er nicht tut:
     - er urteilt nicht
     - er verändert die Atome nicht
     - er kennt ihre inneren Funktionen nicht
   ═══════════════════════════════════════════════════════════ */

import "./NOAH.js";
import "./SLI.js";
import "./brücke.js";
import "./continuum-bridge.js";
import "./vector.energie.js";

/* ─── TMP-KENNZEICHNUNG ──────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  gilt_bis: 'auf Widerruf',
  seit: new Date().toISOString(),
  grund: 'funktional · nicht final',
};

/* ─── DIE BRÜCKE ─────────────────────────────────────── */
window.BRIDGE = {
  noah:       NOAH,
  sli:        SLI,
  bruecke:    BRÜCKE,
  continuum:  CONTINUUM_BRIDGE,
  energie:    VECTOR,

  // tmp-Zustand
  tmp: TMP,

  // Prüfstein: läuft die Brücke?
  lebt(){
    return this.noah && this.sli && this.bruecke && this.continuum && this.energie;
  },

  // Was ist die Brücke?
  was(){
    return {
      name: 'BRIDGE',
      zweck: 'verbindet die fünf atome',
      status: TMP.status,
      wahrheit: TMP.wahrheit,
      atome: ['noah', 'sli', 'bruecke', 'continuum', 'energie'],
      lebt: this.lebt(),
    };
  },

  // Anmerkung setzen (irgendwo)
  anmerkung(){
    return `${TMP.wahrheit} · ${TMP.grund} · seit ${TMP.seit}`;
  },
};

/* ─── ANMERKUNG IN DER KONSOLE ──────────────────────── */
console.log('');
console.log('  BRIDGE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  status ·', TMP.status);
console.log('  lebt ·', window.BRIDGE.lebt());
console.log('  atome ·', window.BRIDGE.was().atome.join(' · '));
console.log('');
