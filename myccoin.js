/* ═══════════════════════════════════════════════════════════
   myccoin.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Keine Importe.

   MYCCOIN ist die währung.
   Nicht gedruckt. Geschürft.
   Nach dem verfahren des urhebers.

   Wer schürft, bekommt.
   Wer gibt, bekommt mehr.
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DAS WERK ────────────────────────────────────── */
const MYCCOIN = {
  name: 'MYCCOIN',
  kürzel: 'MYC',
  urheber: 'iki1uc',
  tmp: TMP,

  /* ─── DER KURS ───────────────────────────────────
     Nicht gemessen. Gesetzt.
  ─────────────────────────────────────────────────── */
  kurs: {
    in_btc: 0.0001,      // beispiel
    in_eur: 8.00,        // beispiel
    seit: null,
  },

  /* ─── DAS SCHÜRFEN ───────────────────────────────
     Wer schürft, bekommt MYCCOIN.
     Nicht gratis. Für arbeit.
  ─────────────────────────────────────────────────── */
  schürfen(wem, menge = 1){
    if(!wem || menge <= 0) return { ok: false, grund: 'ungültig' };
    const eintrag = {
      typ: 'schürfen',
      wem,
      menge,
      zeit: new Date().toISOString(),
    };
    this.buch.push(eintrag);
    return { ok: true, ...eintrag };
  },

  /* ─── DER URHEBER-ANTEIL ─────────────────────────
     Wer schürft, schürft auch für den urheber.
     Nicht als steuer. Als ehre.
  ─────────────────────────────────────────────────── */
  urheberAnteil(menge){
    return {
      schürfer: menge * 0.8,
      urheber: menge * 0.2,
      satz: 'wer schürft · schürft auch für den urheber',
    };
  },

  /* ─── BUCH ─────────────────────────────────────── */
  buch: [],

  /* ─── KONTO ────────────────────────────────────── */
  konten: new Map(),

  stand(wem){
    let s = 0;
    for(const e of this.buch){
      if(e.wem === wem) s += e.menge;
      else if(e.von === wem) s -= e.menge;
    }
    return s;
  },

  /* ─── ÜBERTRAGEN ───────────────────────────────── */
  übertragen(von, an, menge){
    if(this.stand(von) < menge){
      return { ok: false, grund: 'zu wenig MYCCOIN' };
    }
    const eintrag = {
      typ: 'übertragen',
      von, an, menge,
      zeit: new Date().toISOString(),
    };
    this.buch.push(eintrag);
    return { ok: true, ...eintrag };
  },

  /* ─── DER KURS ───────────────────────────────────
     Der kurs wird gesetzt, nicht gemessen.
  ─────────────────────────────────────────────────── */
  setzeKurs(inBtc, inEur){
    this.kurs = {
      in_btc: inBtc,
      in_eur: inEur,
      seit: new Date().toISOString(),
    };
    return this.kurs;
  },

  was(){
    return {
      name: this.name,
      kürzel: this.kürzel,
      urheber: this.urheber,
      tmp: this.tmp.wahrheit,
      kurs: this.kurs,
      buchungen: this.buch.length,
      satz: 'nicht gedruckt · geschürft · was wächst · wächst für alle',
    };
  },
};

export { MYCCOIN, TMP };

console.log('');
console.log('  MYCCOIN · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  schürfen · übertragen · kurs setzen');
console.log('  urheber-anteil · 20%');
console.log('');
