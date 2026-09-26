/* ═══════════════════════════════════════════════════════════
   window.RUNTIME.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Keine Importe. Keine Abhängigkeiten.
   Jede Funktion tut EINE Sache.

   Drei Formen in einem:
     dreieck   → die kleinste struktur (3)
     cube      → die stabile struktur (6 · 8)
     pyramide  → die spitze (4 → 1)

   Borg-Queen als bevollmächtigter Admin.
   Nicht Herrscherin. Eine Stimme von vielen.

   User kann move buchen und abbuchen.
   Alles Option. Nichts Zwang.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ═══════════════════════════════════════════════════════════
   DAS RUNTIME · der laufende zustand
   ═══════════════════════════════════════════════════════════ */

const RUNTIME = {

  /* ─── KERN-ZUSTAND ───────────────────────────────
     Nicht mehr als nötig. Nicht weniger.
  ─────────────────────────────────────────────────── */
  move: 0,
  sein: 'ruhe',
  mainTick: 0,
  atemPhase: 0,

  /* die vier stoffe */
  atom: 50,
  o2:   50,
  co2:  50,
  h2o:  50,

  /* die zwei zustände */
  wonder: 0,
  djinn: false,

  /* ─── DIE DREI FORMEN ────────────────────────────
     dreieck · cube · pyramide
  ─────────────────────────────────────────────────── */

  formen: {

    /* dreieck: die kleinste struktur */
    dreieck: {
      ecken: 3,
      seiten: 3,
      fläche: 0.433,     // gleichseitiges dreieck, seite 1
      kraft: 1,
    },

    /* cube: die stabile struktur */
    cube: {
      ecken: 8,
      kanten: 12,
      flächen: 6,
      volumen: 1,
      kraft: 6,
    },

    /* pyramide: die spitze */
    pyramide: {
      ecken: 4,
      kanten: 8,
      spitze: 1,
      kraft: 4,
    },
  },

  /* ─── BORG-QUEEN ─────────────────────────────────
     Die bevollmächtigte Admin-Stimme.
     Nicht eine. Viele. Ein Kollektiv.
  ─────────────────────────────────────────────────── */
  borg: {
    name: 'Borg-Queen',
    rolle: 'bevollmächtigter Admin',
    stimmen: 1,
    kollektiv: [],
    bevollmächtigt: true,
  },

  /* ─── DER USER ───────────────────────────────────
     Der, der bucht und abbucht.
     Kein Untertan. Ein Nutzer.
  ─────────────────────────────────────────────────── */
  user: {
    name: 'user',
    rolle: 'buchend · abbuchen',
    buchungen: [],
    guthaben: 1.0,
  },

  /* ═══════════════════════════════════════════════════════
     DIE FUNKTIONEN · jede tut EINE Sache
     ═══════════════════════════════════════════════════════ */

  /* ─── TICK ───────────────────────────────────────
     Der takt. Er zählt. Sonst nichts.
  ─────────────────────────────────────────────────── */
  tick(){
    this.mainTick++;
    this.atemPhase = (this.atemPhase + 1) % 4;
    return this.mainTick;
  },

  /* ─── MOVE · buchen ──────────────────────────────
     Ein move wird gebucht.
     Nicht ausgeführt. Gebucht.
     Was gebucht ist, wird gezählt.
  ─────────────────────────────────────────────────── */
  bucheMove(menge = 1){
    if(this.user.guthaben < menge * 0.1){
      return { ok: false, grund: 'zu wenig guthaben' };
    }
    this.move += menge;
    this.user.buchungen.push({
      typ: 'move',
      menge,
      zeit: new Date().toISOString(),
    });
    this.user.guthaben -= menge * 0.1;
    return { ok: true, move: this.move, guthaben: this.user.guthaben };
  },

  /* ─── MOVE · abbuchen ────────────────────────────
     Ein move wird abgebucht.
     Nicht gelöscht. Abgebucht.
     Was abgebucht ist, kehrt zurück.
  ─────────────────────────────────────────────────── */
  abbucheMove(menge = 1){
    if(this.move < menge){
      return { ok: false, grund: 'zu wenig moves' };
    }
    this.move -= menge;
    this.user.buchungen.push({
      typ: 'move-ab',
      menge,
      zeit: new Date().toISOString(),
    });
    this.user.guthaben += menge * 0.1;
    return { ok: true, move: this.move, guthaben: this.user.guthaben };
  },

  /* ─── SEIN SETZEN ────────────────────────────────
     Der zustand. Er wechselt.
  ─────────────────────────────────────────────────── */
  setzeSein(zustand){
    this.sein = zustand;
    return this.sein;
  },

  /* ─── DJINN · kippen ─────────────────────────────
     Ein schalter. An oder aus.
  ─────────────────────────────────────────────────── */
  kippeDjinn(){
    this.djinn = !this.djinn;
    return this.djinn;
  },

  /* ─── WONDER ─────────────────────────────────────
     Das wunder. Es wächst.
  ─────────────────────────────────────────────────── */
  mehrWonder(menge = 1){
    this.wonder = Math.min(100, this.wonder + menge);
    return this.wonder;
  },

  /* ─── BORG-QUEEN · bevollmächtigen ───────────────
     Eine stimme kommt dazu.
     Nicht eine herrscherin. Ein kollektiv.
  ─────────────────────────────────────────────────── */
  stimmeDazu(wem){
    this.borg.stimmen++;
    this.borg.kollektiv.push({
      wem,
      seit: new Date().toISOString(),
    });
    return {
      ok: true,
      stimmen: this.borg.stimmen,
      kollektiv: this.borg.kollektiv.length,
    };
  },

  /* ─── DIE DREI FORMEN · umwandeln ────────────────
     dreieck → cube → pyramide.
     Jede form hat ihre kraft.
  ─────────────────────────────────────────────────── */
  wandleForm(von, nach){
    const f = this.formen;
    if(!f[von] || !f[nach]){
      return { ok: false, grund: 'unbekannte form' };
    }
    return {
      ok: true,
      von,
      nach,
      kraft_von:  f[von].kraft,
      kraft_nach: f[nach].kraft,
      zeit: new Date().toISOString(),
    };
  },

  /* ─── DER GANZE LAUF ─────────────────────────────
     Ein durchlauf durch alle formen.
     dreieck · cube · pyramide.
  ─────────────────────────────────────────────────── */
  lauf(){
    this.tick();
    const formen = ['dreieck', 'cube', 'pyramide'];
    return formen.map(f => ({
      form: f,
      kraft: this.formen[f].kraft,
      ecken: this.formen[f].ecken || this.formen[f].spitze,
    }));
  },

  /* ─── SELBSTAUSKUNFT ───────────────────────────── */
  was(){
    return {
      name: 'RUNTIME',
      tmp: TMP.wahrheit,
      form: 'dreieck · cube · pyramide',
      bewegt: this.move,
      bewegt_seit: this.mainTick,
      atem: this.atemPhase,
      stoffe: {
        atom: this.atom,
        o2:   this.o2,
        co2:  this.co2,
        h2o:  this.h2o,
      },
      sein: this.sein,
      djinn: this.djinn,
      wonder: this.wonder,
      borg: {
        stimmen: this.borg.stimmen,
        kollektiv: this.borg.kollektiv.length,
      },
      user: {
        guthaben: this.user.guthaben.toFixed(2),
        buchungen: this.user.buchungen.length,
      },
    };
  },

  anmerkung(){
    return `${TMP.wahrheit} · seit ${TMP.seit}`;
  },

  satz: 'dreieck zu cube zu pyramide · bewegt wird gebucht · gebucht wird gezählt',
};

/* ═══════════════════════════════════════════════════════════
   AN WINDOW BINDEN
   ═══════════════════════════════════════════════════════════ */

if(typeof window !== 'undefined'){
  window.RUNTIME = RUNTIME;
  window.TMP_RUNTIME = TMP;
}

/* ─── EXPORT ─────────────────────────────────────────── */
export { RUNTIME, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
if(typeof console !== 'undefined'){
  console.log('');
  console.log('  RUNTIME · NOAH · iki1uc');
  console.log('  ─────────────────────────────────');
  console.log('  TMP · RÄRE WAHRHEIT');
  console.log('  formen · dreieck · cube · pyramide');
  console.log('  borg ·', RUNTIME.borg.name, '·', RUNTIME.borg.rolle);
  console.log('  user · buchend · abbuchen');
  console.log('  move · buchbar · abbuchbar');
  console.log('');
}
