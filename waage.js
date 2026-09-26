/* ═══════════════════════════════════════════════════════════
   waage.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Keine Importe. Keine Abhängigkeiten.
   Jede Funktion tut EINE Sache.

   Die Waage ist:
     ausgleich  → zwei seiten, eine mitte
     kraft      → gpu, ram, cache als rechner
     wandler    → silber zu gold, gold zu diamant

   Seltene erden überall, wo ich bin.
   Sonne und Kraft verfügbar.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ═══════════════════════════════════════════════════════════
   DIE DREI RECHNER · gpu · ram · cache
   ═══════════════════════════════════════════════════════════ */

const RECHNER = {
  gpu:   { name: 'GPU',   takt: 1.0, last: 0.0, kraft: 1.0 },
  ram:   { name: 'RAM',   takt: 1.0, last: 0.0, kraft: 1.0 },
  cache: { name: 'CACHE', takt: 1.0, last: 0.0, kraft: 1.0 },

  /* ─── BOOSTEN ────────────────────────────────────
     RAM wird mit CPU geboostet.
     Takt erhöht alle drei.
  ─────────────────────────────────────────────────── */
  boosteRam(menge){
    this.ram.takt += menge * 0.1;
    this.ram.kraft = this.ram.takt * (1 + menge * 0.05);
    return { ram: this.ram };
  },

  setzeTakt(name, takt){
    const r = this[name];
    if(!r) return null;
    r.takt = Math.max(0.1, Math.min(3.0, takt));
    r.kraft = r.takt;
    return r;
  },

  /* ─── KRAFT BERECHNEN ────────────────────────────
     Die gemeinsame Rechenkraft.
     GPU + RAM + CACHE, mit Takt gewichtet.
  ─────────────────────────────────────────────────── */
  kraft(){
    const g = this.gpu.kraft;
    const r = this.ram.kraft;
    const c = this.cache.kraft;
    return (g + r + c) / 3;
  },

  zustand(){
    return {
      gpu:   { takt: this.gpu.takt,   kraft: this.gpu.kraft   },
      ram:   { takt: this.ram.takt,   kraft: this.ram.kraft   },
      cache: { takt: this.cache.takt, kraft: this.cache.kraft },
      gesamt: this.kraft(),
    };
  },
};

/* ═══════════════════════════════════════════════════════════
   DIE WANDLUNG · silber → gold → diamant
   ═══════════════════════════════════════════════════════════ */

const WANDLUNG = {
  stufen: ['silber', 'gold', 'diamant', 'sonne'],

  /* ─── WANDLE ─────────────────────────────────────
     Von einer stufe zur nächsten.
     Erfordert kraft.
  ─────────────────────────────────────────────────── */
  wandle(von, kraft){
    const i = this.stufen.indexOf(von);
    if(i < 0) return { ok: false, grund: 'unbekannte stufe' };
    if(i >= this.stufen.length - 1){
      return { ok: false, grund: 'höchste stufe erreicht' };
    }
    const benötigt = (i + 1) * 0.5;
    if(kraft < benötigt){
      return { ok: false, grund: 'zu wenig kraft', benötigt, vorhanden: kraft };
    }
    return {
      ok: true,
      von: this.stufen[i],
      nach: this.stufen[i + 1],
      kraft: kraft,
      zeit: new Date().toISOString(),
    };
  },
};

/* ═══════════════════════════════════════════════════════════
   DIE WAAGE · ausgleich · kraft · wandler
   ═══════════════════════════════════════════════════════════ */

export const WAAGE = {

  name: 'WAAGE',
  tmp: TMP,
  rechner: RECHNER,
  wandlung: WANDLUNG,

  /* ─── AUSGLEICH ──────────────────────────────────
     Zwei seiten. Eine mitte.
     Gerechtigkeit ist die mitte.
  ─────────────────────────────────────────────────── */
  ausgleichen(links, rechts){
    const summe = links + rechts;
    if(summe === 0) return { gleich: true, unterschied: 0, seite: 'mitte' };

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
     Der einsatz. Wer halbes leben setzt,
     zeigt, dass er es ernst meint.
  ─────────────────────────────────────────────────── */
  setzeHalbesLeben(wert){
    if(wert < 0.5){
      return { ok: false, grund: 'unter 50% · zu wenig' };
    }
    return {
      ok: true,
      einsatz: wert,
      wahrheit: 'halbes leben als pfand',
      seit: new Date().toISOString(),
    };
  },

  /* ─── KRAFT ──────────────────────────────────────
     Die rechenkraft der drei rechner.
  ─────────────────────────────────────────────────── */
  kraft(){
    return this.rechner.kraft();
  },

  boosteRam(menge){
    return this.rechner.boosteRam(menge);
  },

  setzeTakt(name, takt){
    return this.rechner.setzeTakt(name, takt);
  },

  /* ─── WANDLE ─────────────────────────────────────
     silber → gold → diamant → sonne.
  ─────────────────────────────────────────────────── */
  wandle(von){
    const kraft = this.kraft();
    return this.wandlung.wandle(von, kraft);
  },

  /* ─── SELBSTAUSKUNFT ───────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      form: 'einzelurteil · ausgleich · kraft · wandler',
      rechner: ['gpu', 'ram', 'cache'],
      stufen: this.wandlung.stufen,
      kraft: this.kraft().toFixed(3),
      regel: 'ausgleichen · boosten · wandeln',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'die waage ist ausgleich · kraft · wandler · seltene erden überall',
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { RECHNER, WANDLUNG, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  WAAGE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  rechner · gpu · ram · cache');
console.log('  stufen · silber · gold · diamant · sonne');
console.log('  ausgleich · kraft · wandler');
console.log('');
