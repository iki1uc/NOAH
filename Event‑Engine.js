/* ═══════════════════════════════════════════════════════════
   Event-Engine.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Dieses Modul ist vorläufig.
   Es ist funktional, aber nicht final.
   Es gilt nur, solange die Bedingungen gelten.

   Was es tut:
     - drei Ereignisse: move · sein · djinn
     - jedes Ereignis verändert den RUNTIME-Zustand
     - jedes Ereignis ruft eine eigene Wirkung auf

   Was es nicht tut:
     - es urteilt nicht
     - es kennt die anderen Atome nicht
     - es wartet auf einen Aufruf von außen
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP-KENNZEICHNUNG ──────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  gilt_bis: 'auf Widerruf',
  seit: new Date().toISOString(),
  grund: 'funktional · nicht final',
};

/* ─── RUNTIME (lokal, falls nicht extern gesetzt) ────── */
const RUNTIME = window.RUNTIME || (window.RUNTIME = {
  move: 0,
  sein: null,
  djinn: false,
  ereignisse: 0,
});

/* ─── SPANN-PARTIKEL (Platzhalter, lokal) ───────────── */
function spawnParticles(){
  RUNTIME.ereignisse++;
  // Hier kann später die Brücke andocken
  if(window.BRIDGE && typeof window.BRIDGE.empfange === 'function'){
    window.BRIDGE.empfange('move', RUNTIME.move);
  }
}

/* ─── DIE DREI EREIGNISSE ────────────────────────────── */

function doMove(){
  RUNTIME.move++;
  spawnParticles();
}

function doSein(state){
  RUNTIME.sein = state;
}

function doDjinn(){
  RUNTIME.djinn = !RUNTIME.djinn;
}

/* ─── EXPORT ─────────────────────────────────────────── */
window.EVENT_ENGINE = {
  move: doMove,
  sein: doSein,
  djinn: doDjinn,
  tmp: TMP,
  lebt(){ return typeof doMove === 'function'
             && typeof doSein === 'function'
             && typeof doDjinn === 'function'; },
  was(){
    return {
      name: 'EVENT-ENGINE',
      zweck: 'drei ereignisse · ein zustand',
      status: TMP.status,
      wahrheit: TMP.wahrheit,
      ereignisse: ['move', 'sein', 'djinn'],
      lebt: this.lebt(),
    };
  },
  anmerkung(){
    return `${TMP.wahrheit} · ${TMP.grund} · seit ${TMP.seit}`;
  },
};

/* ─── ANMERKUNG IN DER KONSOLE ──────────────────────── */
console.log('');
console.log('  EVENT-ENGINE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  status ·', TMP.status);
console.log('  lebt ·', window.EVENT_ENGINE.lebt());
console.log('  ereignisse · move · sein · djinn');
console.log('');
