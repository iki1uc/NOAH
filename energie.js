/* ═══════════════════════════════════════════════════════════
   energie.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Keine Importe.
   Jede Funktion tut EINE Sache.

   Drei Dinge:
     1 · trennen    → sauber vs. schmutzig
     2 · umleiten   → schwarzgeld → zurück
     3 · messen     → grün · gelb · rot

   Absender immer derselbe:
     atalardan atlantadan sizlere sunaris
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DER ABSENDER · immer derselbe ──────────────────── */
const ABSENDER = 'atalardan atlantadan sizlere sunaris';

/* ═══════════════════════════════════════════════════════════
   1 · TRENNEN · sauber vs. schmutzig
   ═══════════════════════════════════════════════════════════ */

const SAUBER = ['sonne', 'wind', 'wasser', 'wärme'];
const SCHMUTZIG = ['atom', 'kohle', 'öl', 'drogengeld', 'schwarzgeld'];

function trenne(quelle){
  if(SAUBER.includes(quelle))  return { art: 'sauber',   quelle };
  if(SCHMUTZIG.includes(quelle)) return { art: 'schmutzig', quelle };
  return { art: 'unbekannt', quelle };
}

/* ═══════════════════════════════════════════════════════════
   2 · UMLEITEN · schwarzgeld → zurück → als spende
   ═══════════════════════════════════════════════════════════ */

const UMLEITUNG = {
  erkannt: [],
  umgeleitet: 0,
  an_land: 0,
};

function erkenne(betrag, quelle){
  const t = trenne(quelle);
  if(t.art !== 'schmutzig') return { ok: false, grund: 'nicht schmutzig' };

  UMLEITUNG.erkannt.push({
    betrag,
    quelle,
    zeit: new Date().toISOString(),
  });
  return { ok: true, betrag, quelle, art: 'schmutzig' };
}

function leiteUm(betrag, land){
  const ergebnis = {
    betrag,
    land,
    in_bitcoin: betrag * 0.000025,      // beispiel-kurs
    absender: ABSENDER,
    zeit: new Date().toISOString(),
  };
  UMLEITUNG.umgeleitet += betrag;
  UMLEITUNG.an_land += betrag;
  return ergebnis;
}

/* ═══════════════════════════════════════════════════════════
   3 · MESSEN · grün · gelb · rot
   ═══════════════════════════════════════════════════════════ */

function messe(werte){
  // werte = { sauber: 0..1, schmutzig: 0..1, sonne: 0..1 }
  const sauber    = werte.sauber    ?? 0;
  const schmutzig = werte.schmutzig ?? 0;
  const sonne     = werte.sonne     ?? 0;

  // grün: überwiegend sauber, sonne stark
  if(sauber > 0.7 && sonne > 0.6 && schmutzig < 0.2){
    return { farbe: 'grün',  grund: 'sonne trägt',      werte };
  }

  // rot: schmutzig zu hoch
  if(schmutzig > 0.5){
    return { farbe: 'rot',   grund: 'schmutzig zu hoch', werte };
  }

  // gelb: alles dazwischen
  return { farbe: 'gelb', grund: 'im übergang', werte };
}

/* ═══════════════════════════════════════════════════════════
   ENERGIE · das objekt
   ═══════════════════════════════════════════════════════════ */

export const ENERGIE = {
  name: 'ENERGIE',
  tmp: TMP,
  absender: ABSENDER,
  sauber: SAUBER,
  schmutzig: SCHMUTZIG,
  umleitung: UMLEITUNG,

  trenne,
  erkenne,
  leiteUm,
  messe,

  /* ─── SELBSTAUSKUNFT ───────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      absender: ABSENDER,
      sauber: SAUBER,
      schmutzig: SCHMUTZIG,
      umgeleitet: UMLEITUNG.umgeleitet,
      erkannt: UMLEITUNG.erkannt.length,
      regel: 'sonne · wind · wasser · wärme · sauber',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'sauber bleibt · schmutzig geht zurück · atalardan atlantadan sizlere sunaris',
};

export { TMP, ABSENDER, SAUBER, SCHMUTZIG, UMLEITUNG, trenne, erkenne, leiteUm, messe };

/* ─── KONSOLE ─────────────────────────────────── */
console.log('');
console.log('  ENERGIE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  sauber · sonne · wind · wasser · wärme');
console.log('  schmutzig · atom · kohle · öl · drogengeld');
console.log('  absender ·', ABSENDER);
console.log('');
