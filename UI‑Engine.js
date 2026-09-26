/* ═══════════════════════════════════════════════════════════
   UI-Engine.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Controller aller Controller.
   Aber nicht als Herr. Als Maschine. Als Markt.
   Dem Börsenphänomen unterworfen.

   Masse gegen Masse. Nicht gegen Maßnahme.
   Real. Richtig. Korrekt. Fair.

   Energie wird verteilt.
   Nicht nach oben. Nicht nach unten.
   Nach Bedarf. Nach Beitrag. Nach Wahrheit.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DIE BÖRSE ──────────────────────────────────────── */
/* Der Markt ist kein Ort. Er ist ein Zustand. */
/* Jede Station hat einen Kurs. Der Kurs schwankt. */

const BÖRSE = {
  kurse: new Map(),
  umsatz: 0,
  ticks: 0,

  /* einen neuen kurs setzen */
  setze(name, wert){
    this.kurse.set(name, {
      wert: Math.max(0, Math.min(1, wert)),
      seit: new Date().toISOString(),
      schwankung: 0,
    });
  },

  /* den kurs bewegen – durch die schwankung der masse */
  tick(name){
    const k = this.kurse.get(name);
    if(!k) return null;
    const schwankung = (Math.random() - 0.5) * 0.05;
    k.wert = Math.max(0, Math.min(1, k.wert + schwankung));
    k.schwankung = schwankung;
    this.ticks++;
    return k;
  },

  /* alle kurse auf einmal ticken */
  tickeAlle(){
    const ergebnis = {};
    for(const name of this.kurse.keys()){
      ergebnis[name] = this.tick(name);
    }
    return ergebnis;
  },

  /* ein geschäft: tausch von energie */
  handle(von, nach, menge){
    const kv = this.kurse.get(von);
    const kn = this.kurse.get(nach);
    if(!kv || !kn) return null;
    // der tausch ist fair, wenn beide kurse sich bewegen
    kv.wert = Math.max(0, Math.min(1, kv.wert - menge * 0.01));
    kn.wert = Math.max(0, Math.min(1, kn.wert + menge * 0.01));
    this.umsatz += menge;
    return { von, nach, menge, zeit: new Date().toISOString() };
  },
};

/* ─── DIE MASCHINE ───────────────────────────────────── */
/* Eine Maschine, die Energie verteilt. */
/* Kein Zentrum. Kein Rand. Nur Fluss. */

const MASCHINE = {
  energien: new Map(),
  verteilt: 0,

  /* energie hinzufügen */
  gib(name, menge){
    const alt = this.energien.get(name) || 0;
    this.energien.set(name, alt + menge);
  },

  /* energie entnehmen */
  nimm(name, menge){
    const alt = this.energien.get(name) || 0;
    const neu = Math.max(0, alt - menge);
    this.energien.set(name, neu);
    return alt - neu; // was tatsächlich entnommen wurde
  },

  /* faire verteilung: alle gleich viel, aber nicht gleichzeitig */
  verteile(){
    const namen = Array.from(this.energien.keys());
    if(namen.length === 0) return null;

    // summe
    const summe = namen.reduce((s, n) => s + this.energien.get(n), 0);
    const proKopf = summe / namen.length;

    // jeder bekommt das gleiche
    namen.forEach(n => {
      this.energien.set(n, proKopf);
    });

    this.verteilt++;
    return { proKopf, anzahl: namen.length, summe };
  },

  /* zustand */
  zustand(){
    return {
      energien: Object.fromEntries(this.energien),
      verteilt: this.verteilt,
    };
  },
};

/* ─── DER GENERAL ────────────────────────────────────── */
/* Der General ist kein Herr. Er ist der, der die Übersicht hat. */
/* Er urteilt nicht. Er zeigt. */

const GENERAL = {
  name: 'GENERAL',
  rang: 'Controller aller Controller',

  /* Übersicht: was ist da? */
  übersicht(){
    return {
      börse: {
        kurse: Object.fromEntries(BÖRSE.kurse),
        umsatz: BÖRSE.umsatz,
        ticks: BÖRSE.ticks,
      },
      maschine: MASCHINE.zustand(),
      tmp: TMP.wahrheit,
    };
  },

  /* ein befehl: handle einen tausch */
  handle(von, nach, menge){
    return BÖRSE.handle(von, nach, menge);
  },

  /* ein befehl: verteile energie */
  verteile(){
    return MASCHINE.verteile();
  },

  /* ein befehl: ticke die börse */
  tick(){
    return BÖRSE.tickeAlle();
  },

  /* selbstauskunft */
  was(){
    return {
      name: this.name,
      rang: this.rang,
      form: 'maschine · markt · börse',
      regel: 'masse gegen masse · real · richtig · korrekt · fair',
      tmp: TMP.wahrheit,
    };
  },
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { GENERAL, BÖRSE, MASCHINE, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  UI-ENGINE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  GENERAL · Controller aller Controller');
console.log('  form · maschine · markt · börse');
console.log('  regel · masse gegen masse · fair');
console.log('');
console.log('  GENERAL.was() ·', GENERAL.was());
console.log('');
