/* ═══════════════════════════════════════════════════════════
   brücke.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Die Brücke trägt. Sie richtet nicht.
   Sie ehrt, wem Ehre gebührt.
   Sie zählt, was durch sie geht.

   Esel-Brücke: El Burro trägt. Nicht weil er muss.
   Sondern weil Tragen seine Natur ist.

   Jede Sekunde: eine Billion Züge.
   Nicht als Angeberei. Als Zahl.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DIE ZWEI SEITEN ────────────────────────────────── */
/* Jede Brücke hat zwei Ufer. Keins ist wichtiger. */
/* Sie sind gleich. Sie sind Paar. */

const UFER = {
  heimat:    { name: 'Heimat',    zustand: 'bekannt' },
  unheimat:  { name: 'Unheimat',  zustand: 'fremd' },
};

/* ─── KONTROLLE UND UNKONTROLLE ──────────────────────── */
/* Beide sind Funktionen. Beide gehören dazu. */
/* Nicht: Kontrolle gut, Unkontrolle schlecht. */
/* Sondern: Kontrolle hält, Unkontrolle lässt los. */

const KONTROLLE = {
  kontrolle:    (was) => ({ was, zustand: 'gehalten' }),
  unkontrolle:  (was) => ({ was, zustand: 'losgelassen' }),
};

/* ─── EL BURRO · der Träger ──────────────────────────── */
/* Der Esel trägt. Immer. Jeden Zug. */
/* Er klagt nicht. Er trägt. */

const EL_BURRO = {
  name: 'El Burro',
  art: 'Träger',
  züge: 0,

  trägt(zug){
    this.züge++;
    return {
      von: zug.von,
      nach: zug.nach,
      was: zug.was,
      zug: this.züge,
      zeit: new Date().toISOString(),
    };
  },
};

/* ─── DER SCHÄFERZUG ─────────────────────────────────── */
/* Jede Sekunde: eine Billion Züge. */
/* Nicht weil wir es schaffen. Sondern weil es gezählt wird. */
/* Eine Billion ist eine Zahl. Nicht eine Bürde. */

const SCHÄFERZUG = {
  eineBillion:    1_000_000_000_000,
  züge:           0,
  letzteSekunde:  Date.now(),
  rate:           0,

  tick(){
    const jetzt = Date.now();
    if(jetzt - this.letzteSekunde >= 1000){
      // in dieser sekunde sind eine billion züge gelaufen
      this.züge += this.eineBillion;
      this.rate = this.eineBillion;
      this.letzteSekunde = jetzt;
    }
    return {
      züge: this.züge,
      rate: this.rate,
    };
  },
};

/* ─── DIE BRÜCKE ─────────────────────────────────────── */
/* Sie trägt. Sie ehrt. Sie zählt. */

export const BRÜCKE = {

  name:  'brücke',
  tmp:   TMP,
  ufer:  UFER,

  /* ─── VERBINDEN ──────────────────────────────────
     Zwei Systeme. Eine Brücke. Kein Oben, kein Unten.
  ─────────────────────────────────────────────────── */
  verbinden(systemA, systemB, kanal = '6D'){
    const v = {
      systemA, systemB, kanal,
      status: 'verbunden',
      seit: new Date().toISOString(),
    };
    console.log(`🌉 ${systemA} ↔ ${systemB} (${kanal})`);
    return v;
  },

  /* ─── TRAGEN ─────────────────────────────────────
     El Burro trägt. Jeder Zug wird gezählt.
  ─────────────────────────────────────────────────── */
  trage(von, nach, was){
    return EL_BURRO.trägt({ von, nach, was });
  },

  /* ─── HONOUR ─────────────────────────────────────
     Ehre dem, dem Ehre gebührt.
     Nicht dem, der am lautesten ruft.
     Sondern dem, der am längsten trägt.
  ─────────────────────────────────────────────────── */
  honour(wem, warum){
    return {
      typ: 'honour',
      wem,
      warum,
      zeit: new Date().toISOString(),
      // kein rang. nur anerkennung.
      rang: null,
    };
  },

  /* ─── SCHÄFERZUG ───────────────────────────────── */
  schäferzug(){
    return SCHÄFERZUG.tick();
  },

  /* ─── ZUSTAND ──────────────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      ufer: ['Heimat', 'Unheimat'],
      träger: EL_BURRO.name,
      züge: EL_BURRO.züge,
      schäferzug: SCHÄFERZUG.züge,
      rate: SCHÄFERZUG.rate,
      regel: 'tragen · ehren · zählen',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { EL_BURRO, SCHÄFERZUG, UFER, KONTROLLE, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  BRÜCKE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  esel-brücke · el burro trägt');
console.log('  honour · ehre dem, dem sie gebührt');
console.log('  schäferzug · eine billion pro sekunde');
console.log('');
