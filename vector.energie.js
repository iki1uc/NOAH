/* ═══════════════════════════════════════════════════════════
   vector.energie.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Keine Importe.
   Jede Funktion tut eine Sache.

   Sechs Dimensionen:
     ursache · wirkung · flow · struktur · energie · ziel

   Sechs Hardware-Schichten (dieselben sechs):
     kernel · cpu · ram · gpu · rom · cache

   Was im Vector fließt, fließt durch alle sechs.
   Energie ist die Antriebskraft.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ═══════════════════════════════════════════════════════════
   DIE SECHS · zwei Seiten derselben Sache
   ═══════════════════════════════════════════════════════════ */

const DIMENSIONEN = [
  { id: 0, name: 'ursache',  hardware: 'kernel' },
  { id: 1, name: 'wirkung',  hardware: 'cpu'    },
  { id: 2, name: 'flow',     hardware: 'ram'    },
  { id: 3, name: 'struktur', hardware: 'gpu'    },
  { id: 4, name: 'energie',  hardware: 'rom'    },
  { id: 5, name: 'ziel',     hardware: 'cache'  },
];

/* ═══════════════════════════════════════════════════════════
   VECTOR · der Träger
   ═══════════════════════════════════════════════════════════ */

export const VECTOR = {

  name: 'VECTOR',
  tmp: TMP,
  dimensionen: DIMENSIONEN,

  /* ─── ZUSTAND ─────────────────────────────────── */
  aktiv: false,
  pumpeWert: 0,     // die zahl (kein konflikt mehr)
  wurzel: 0,
  bücher: [],       // jede attacke wird gebucht

  /* ─── BERECHNE ───────────────────────────────────
     Der Fluss zwischen zwei punkten.
     Goldener schnitt: 0.618.
  ─────────────────────────────────────────────────── */
  berechne(start, ziel){
    const distanz = Math.abs(ziel - start);
    const energie = distanz * 0.618;
    return {
      start,
      ziel,
      distanz,
      energie,
      status: energie > 0 ? 'flow' : 'ruhe',
    };
  },

  /* ─── ATTACKE ────────────────────────────────────
     Ein befehl durch alle sechs dimensionen.
     Kein krieg. Ein durchlauf.
  ─────────────────────────────────────────────────── */
  attacke(befehl, parameter = {}){
    const durchlauf = {
      befehl,
      parameter,
      dimensionen: DIMENSIONEN.map(d => `${d.name}/${d.hardware}`),
      status: 'durchgelaufen',
      zeit: new Date().toISOString(),
    };

    this.aktiv = true;
    this.pumpeWert += 1;
    this.bücher.push(durchlauf);
    if(this.bücher.length > 100) this.bücher.shift();

    return durchlauf;
  },

  /* ─── PUMPE ──────────────────────────────────────
     Die pumpe bewegt energie.
     Kein konflikt mit dem zustand.
  ─────────────────────────────────────────────────── */
  pumpe(stärke = 1){
    this.pumpeWert += stärke;
    this.wurzel = this.pumpeWert * 0.333;
    return {
      pumpe: this.pumpeWert,
      wurzel: this.wurzel,
    };
  },

  /* ─── WURZEL ─────────────────────────────────────
     Was die pumpe trägt.
     Nicht für immer. Nur jetzt.
  ─────────────────────────────────────────────────── */
  wurzelStand(){
    return {
      pumpe: this.pumpeWert,
      wurzel: this.wurzel,
      verhältnis: this.pumpeWert > 0
        ? (this.wurzel / this.pumpeWert).toFixed(3)
        : '0.000',
    };
  },

  /* ─── SELBSTAUSKUNFT ───────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      dimensionen: DIMENSIONEN.map(d => d.name),
      hardware: DIMENSIONEN.map(d => d.hardware),
      aktiv: this.aktiv,
      pumpe: this.pumpeWert,
      bücher: this.bücher.length,
      form: '6d · kernel · cpu · ram · gpu · rom · cache',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'sechs dimensionen · sechs schichten · ein fluss · eine wurzel',
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { DIMENSIONEN, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  VECTOR · 6D NC · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  dimensionen · ursache · wirkung · flow · struktur · energie · ziel');
console.log('  hardware   · kernel · cpu · ram · gpu · rom · cache');
console.log('  ein fluss · eine wurzel');
console.log('');
