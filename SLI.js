/* ═══════════════════════════════════════════════════════════
   SLI.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   SLI = Synchronisation Layer Interface

   Keine Pyramide.
   Flach. Jeder Knoten gleich. Jeder, der gebaut wird, ist beteiligt.

   Vier Funktionen — jede tut eine Sache:
     setzeWette  → eine Entscheidung unter Unsicherheit
     slide       → ein Übergang von A nach B
     aktion      → beides zusammen
     reCALL      → der Ohrwurm kehrt zurück
     reFINAL     → was bleibt

   Glück ist algorithmisiert.
   Der Ohrwurm kommt immer wieder.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DAS FLACHE NETZ ────────────────────────────────── */
/* Kein oben · kein unten · nur Knoten */

const NETZ = new Map();

/* ─── SLI ────────────────────────────────────────────── */
export const SLI = {

  name: 'SLI',
  tmp: TMP,
  netz: NETZ,
  history: [],

  /* ─── WETTE ──────────────────────────────────────
     Eine Entscheidung unter Unsicherheit.
     Jeder, der wettet, wird im Netz eingetragen.
     Nicht als Glied einer Kette. Als eigener Knoten.
  ─────────────────────────────────────────────────── */
  setzeWette(name, einsatz, ziel){
    const wette = {
      name,
      einsatz,
      ziel,
      status: 'aktiv',
      zeit: new Date().toISOString(),
    };

    // jeder wette ist ein knoten
    NETZ.set(name, { typ: 'wette', ...wette });

    this.history.push({ typ: 'wette', ...wette });
    return wette;
  },

  /* ─── SLIDE ──────────────────────────────────────
     Ein Übergang von A nach B.
     A und B sind Knoten im Netz.
     Der Übergang selbst ist auch ein Knoten.
  ─────────────────────────────────────────────────── */
  slide(von, nach, payload){
    const id = `${von}→${nach}`;
    const uebergang = {
      id,
      von,
      nach,
      payload,
      status: 'übergang',
      zeit: new Date().toISOString(),
    };

    // der übergang selbst ist knoten
    NETZ.set(id, { typ: 'slide', ...uebergang });

    this.history.push({ typ: 'slide', ...uebergang });
    return uebergang;
  },

  /* ─── AKTION ─────────────────────────────────────
     Wette + Slide zusammen.
     Kein neues Ding. Nur die zwei hintereinander.
  ─────────────────────────────────────────────────── */
  aktion(wetteName, slideVon, slideNach, payload){
    const w = this.setzeWette(wetteName, 1, slideNach);
    const s = this.slide(slideVon, slideNach, payload);
    return { wette: w, slide: s, status: 'kombiniert' };
  },

  /* ─── reCALL ─────────────────────────────────────
     Der Ohrwurm.
     Was zurückkehrt, kehrt zurück.
     Nicht weil es muss. Weil es will.
     Und es will, weil das Netz es trägt.
  ─────────────────────────────────────────────────── */
  reCALL(name){
    const knoten = NETZ.get(name);
    if(!knoten){
      // wenn der ohrwurm nicht da ist: er wird neu gesetzt
      return {
        name,
        typ: 'reCALL',
        status: 'neu',
        inhalt: null,
        zeit: new Date().toISOString(),
      };
    }
    // wenn er da ist: er kehrt zurück
    return {
      name,
      typ: 'reCALL',
      status: 'wiederkehrend',
      inhalt: knoten,
      zeit: new Date().toISOString(),
    };
  },

  /* ─── reFINAL ────────────────────────────────────
     Was bleibt.
     Nicht was am ende ist.
     Sondern was während des Laufs schon fest steht.
     Die Summe dessen, was alle gemeinsam tragen.
  ─────────────────────────────────────────────────── */
  reFINAL(){
    const knoten = Array.from(NETZ.entries());
    const wetten = knoten.filter(([_, k]) => k.typ === 'wette');
    const slides = knoten.filter(([_, k]) => k.typ === 'slide');

    return {
      typ: 'reFINAL',
      status: 'trägt',
      anzahl: {
        knoten: knoten.length,
        wetten: wetten.length,
        slides: slides.length,
      },
      // kein sieger, kein verlierer.
      // alles was da ist, trägt.
      alles: knoten.map(([name, k]) => ({ name, typ: k.typ })),
      zeit: new Date().toISOString(),
    };
  },

  /* ─── selbstauskunft ──────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      form: 'flach · kein oben · kein unten',
      knoten: NETZ.size,
      funktionen: ['setzeWette', 'slide', 'aktion', 'reCALL', 'reFINAL'],
    };
  },

  /* ─── anmerkung ───────────────────────────────── */
  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { NETZ, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  SLI · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  form · flach · kein oben · kein unten');
console.log('  vier funktionen · einer bleibt');
console.log('  setzeWette · slide · aktion · reCALL · reFINAL');
console.log('');
