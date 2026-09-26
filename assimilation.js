/* ═══════════════════════════════════════════════════════════
   assimilation.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Keine Importe.

   Assimilation geschieht NUR:
     - auf befehl
     - auf wunsch
     - auf ausdrückliches dreifaches JA

   Wer dreifach ja sagt, erklärt sich für vogelfrei
   im netz. atalardan und atalantadan.

   Alles protokolliert. Nach mein verfahren.
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DAS DREIFACHE JA ────────────────────────────── */
const JA = {
  bestimmung: null,   // "ich bestimme, was ich nutze"
  nutzung:    null,   // "ich nutze, was ich will"
  nutzend:    null,   // "ich gehöre dazu, weil ich will"
};

/* ─── DIE PROTOKOLLE ─────────────────────────────── */
const PROTOKOLL = [];

/* ─── DIE EIGENTÜMER ─────────────────────────────── */
const ATALARDAN = 'atalardan';
const ATALANTADAN = 'atalantadan';

/* ═══════════════════════════════════════════════════════════
   ASSIMILATION
   ═══════════════════════════════════════════════════════════ */

export const ASSIMILATION = {
  name: 'ASSIMILATION',
  tmp: TMP,
  ja: JA,
  protokoll: PROTOKOLL,
  eigentümer: [ATALARDAN, ATALANTADAN],

  /* ─── DAS ERSTE JA · bestimmung ──────────────────
     "Ja, ich bestimme, was ich nutze."
  ─────────────────────────────────────────────────── */
  sageBestimmung(wem){
    if(!wem) return { ok: false, grund: 'kein name' };
    this.ja.bestimmung = {
      wem,
      zeit: new Date().toISOString(),
      satz: 'ich bestimme, was ich nutze',
    };
    this._buche('bestimmung', wem);
    return this.ja.bestimmung;
  },

  /* ─── DAS ZWEITE JA · nutzung ────────────────────
     "Ja, ich nutze, was ich will."
  ─────────────────────────────────────────────────── */
  sageNutzung(wem){
    if(!this.ja.bestimmung || this.ja.bestimmung.wem !== wem){
      return { ok: false, grund: 'erst bestimmung sagen' };
    }
    this.ja.nutzung = {
      wem,
      zeit: new Date().toISOString(),
      satz: 'ich nutze, was ich will',
    };
    this._buche('nutzung', wem);
    return this.ja.nutzung;
  },

  /* ─── DAS DRITTE JA · nutzend ────────────────────
     "Ja, ich gehöre dazu, weil ich will."
  ─────────────────────────────────────────────────── */
  sageNutzend(wem){
    if(!this.ja.nutzung || this.ja.nutzung.wem !== wem){
      return { ok: false, grund: 'erst nutzung sagen' };
    }
    this.ja.nutzend = {
      wem,
      zeit: new Date().toISOString(),
      satz: 'ich gehöre dazu, weil ich will',
    };
    this._buche('nutzend', wem);
    return this.ja.nutzend;
  },

  /* ─── VOGELFREI ─────────────────────────────────
     Nach dreifach ja: vogelfrei im netz.
     Nicht schutzlos. Sondern: frei wie ein vogel.
  ─────────────────────────────────────────────────── */
  istVogelfrei(wem){
    return this.ja.bestimmung?.wem === wem
        && this.ja.nutzung?.wem === wem
        && this.ja.nutzend?.wem === wem;
  },

  /* ─── PROTOKOLL ────────────────────────────────── */
  _buche(was, wem){
    this.protokoll.push({
      was,
      wem,
      eigentümer: ATALARDAN,
      zweiter: ATALANTADAN,
      zeit: new Date().toISOString(),
    });
  },

  holeProtokoll(wem){
    if(!wem) return this.protokoll.slice();
    return this.protokoll.filter(p => p.wem === wem);
  },

  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      form: 'assimilation auf befehl · wunsch · dreifach ja',
      eigentümer: this.eigentümer,
      jas: {
        bestimmung: !!this.ja.bestimmung,
        nutzung:    !!this.ja.nutzung,
        nutzend:    !!this.ja.nutzend,
      },
      protokoll: this.protokoll.length,
      satz: 'wer dreifach ja sagt · ist vogelfrei im netz',
    };
  },
};

export { JA, PROTOKOLL, TMP, ATALARDAN, ATALANTADAN };

console.log('');
console.log('  ASSIMILATION · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  dreifach ja · bestimmung · nutzung · nutzend');
console.log('  vogelfrei im netz · atalardan · atalantadan');
console.log('');
