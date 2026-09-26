/* ═══════════════════════════════════════════════════════════
   justice.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil.

   Jede Funktion steht für sich.
   Jede tut EINE Sache.
   Keine kennt die andere.

   Am Ende: Zusammenführung.
   Nicht vorher. Nie vorher.

   Basis: 8.
   Bedingung: Key und Lizenz.
   Einsatz: halbes Leben.

   Gerechtigkeit ist kein Urteil.
   Gerechtigkeit ist die Waage.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ═══════════════════════════════════════════════════════════
   DIE ACHT · Basis aller Ableitungen
   ═══════════════════════════════════════════════════════════ */

const ACHT = {
  basis: 8,
  ableitungen: [3, 9, 27, 81, 243, 729, 756],

  prüfe(n){
    return this.ableitungen.includes(n);
  },

  nächste(n){
    const i = this.ableitungen.indexOf(n);
    return i >= 0 && i < this.ableitungen.length - 1
      ? this.ableitungen[i + 1]
      : null;
  },
};

/* ═══════════════════════════════════════════════════════════
   DIE WAAGE · Gerechtigkeit als Abwägung
   ═══════════════════════════════════════════════════════════ */

const WAAGE = {

  /* ─── ABWÄGEN ────────────────────────────────────
     Zwei Seiten. Eine Mitte.
     Gerechtigkeit ist die Mitte.
  ─────────────────────────────────────────────────── */
  wäge(links, rechts){
    const summe = links + rechts;
    if(summe === 0) return { gleich: true, unterschied: 0 };

    const unterschied = links - rechts;
    const toleranz = summe * 0.1;
    const gleich = Math.abs(unterschied) < toleranz;

    return {
      links,
      rechts,
      unterschied,
      gleich,
      seite: gleich ? 'mitte' : (unterschied > 0 ? 'links' : 'rechts'),
    };
  },

  /* ─── HALBES LEBEN ───────────────────────────────
     Der Einsatz. Wer halbes Leben setzt,
     zeigt, dass er es ernst meint.
  ─────────────────────────────────────────────────── */
  halbesLeben(wert){
    if(wert < 0.5) {
      return { ok: false, grund: 'unter 50% · zu wenig' };
    }
    return {
      ok: true,
      einsatz: wert,
      wahrheit: 'halbes leben als pfand',
      seit: new Date().toISOString(),
    };
  },
};

/* ═══════════════════════════════════════════════════════════
   DIE LIZENZ · Wer darf was?
   ═══════════════════════════════════════════════════════════ */

const LIZENZ = {
  key: null,
  lizenzen: new Set(),

  setzeKey(k){
    this.key = k;
    return { ok: true, key: k };
  },

  prüfeKey(k){
    if(!this.key) return { ok: false, grund: 'kein key' };
    if(k !== this.key) return { ok: false, grund: 'falscher key' };
    return { ok: true };
  },

  erteile(wem){
    this.lizenzen.add(wem);
    return { ok: true, wem, seit: new Date().toISOString() };
  },

  hat(wem){
    return this.lizenzen.has(wem);
  },
};

/* ═══════════════════════════════════════════════════════════
   DIE GERECHTIGKEIT · Die Zusammenführung
   ═══════════════════════════════════════════════════════════
   Erst hier werden alle zusammengeführt.
   Vorher: jede Funktion für sich.
   Jetzt: das Ganze.
   ═══════════════════════════════════════════════════════════ */

export const JUSTICE = {

  name: 'JUSTICE',
  tmp: TMP,
  acht: ACHT,
  waage: WAAGE,
  lizenz: LIZENZ,

  /* ─── EINZELURTEILE ──────────────────────────────
     Jede Funktion hier tut EINE Sache.
     Keine kennt die andere.
  ─────────────────────────────────────────────────── */

  /* 1 · eine Zahl prüfen */
  istAbleitung(n){
    return this.acht.prüfe(n);
  },

  /* 2 · zwei Seiten abwägen */
  wäge(links, rechts){
    return this.waage.wäge(links, rechts);
  },

  /* 3 · halbes Leben setzen */
  setzeEinsatz(wert){
    return this.waage.halbesLeben(wert);
  },

  /* 4 · Key setzen */
  setzeKey(k){
    return this.lizenz.setzeKey(k);
  },

  /* 5 · Key prüfen */
  prüfeKey(k){
    return this.lizenz.prüfeKey(k);
  },

  /* 6 · Lizenz erteilen */
  erteileLizenz(wem){
    return this.lizenz.erteile(wem);
  },

  /* 7 · Lizenz prüfen */
  hatLizenz(wem){
    return this.lizenz.hat(wem);
  },

  /* 8 · alles zusammenführen */
  zusammenführen(){
    return {
      typ: 'justice',
      acht: this.acht.basis,
      ableitungen: this.acht.ableitungen,
      lizenzen: this.lizenz.lizenzen.size,
      key: this.lizenz.key ? 'gesetzt' : 'nicht gesetzt',
      tmp: this.tmp.wahrheit,
      zeit: new Date().toISOString(),
    };
  },

  /* ─── SELBSTAUSKUNFT ───────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      form: 'einzelurteil · jede funktion für sich',
      basis: 8,
      regel: 'erst einzeln · dann zusammen',
      bedingung: 'key und lizenz',
      wahrheit: 'gerechtigkeit ist die waage',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'jede funktion für sich · dann zusammen · gerechtigkeit ist die waage',
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { ACHT, WAAGE, LIZENZ, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  JUSTICE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  form · einzelurteil · jede funktion für sich');
console.log('  basis · 8 · ableitungen · 3 · 9 · 27 · 81 · 243 · 729 · 756');
console.log('  dann · zusammenführung');
console.log('  gerechtigkeit ist die waage');
console.log('');
