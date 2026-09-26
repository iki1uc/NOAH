/* ═══════════════════════════════════════════════════════════
   radar.js · circle-navigation · gate · wurmloch · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Keine Importe. Keine Abhängigkeiten.
   Jede Funktion tut eine Sache.

   Die Kette aus geo.md:
     ◉ ROOT → 3 → 9 → ◎ → 81 → ◆ → △ → 27 → ▣ → 3↺ → 0

   Elfte Stufen. Jede ein Knoten.
   Jeder Knoten zieht an — Gravitation.
   Jeder Übergang ist ein Gate — Tür mit Echo.
   Der Durchlauf ist ein Wurmloch — kein Umweg.

   Admin und User sind Rollen. Keine Ränge.
   Energie ist die Antriebskraft.
   Alles logisch. Alles ableitbar. Alles funktional.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ═══════════════════════════════════════════════════════════
   DIE KNOTEN · aus geo.md
   ═══════════════════════════════════════════════════════════ */

const KNOTEN = [
  { stufe: 0,  zeichen: '◉',  name: 'ROOT.index.html', rolle: 'admin',   energie: 1.0 },
  { stufe: 1,  zeichen: '3',  name: 'Axiom-1',          rolle: 'user',    energie: 0.9 },
  { stufe: 2,  zeichen: '9',  name: 'Axiom-0',          rolle: 'user',    energie: 0.8 },
  { stufe: 3,  zeichen: '◎',  name: 'Mind-Zentrum',     rolle: 'admin',   energie: 1.0 },
  { stufe: 4,  zeichen: '81', name: 'NC9×9.room',       rolle: 'user',    energie: 0.7 },
  { stufe: 5,  zeichen: '◆',  name: 'Axiom-2',          rolle: 'admin',   energie: 0.9 },
  { stufe: 6,  zeichen: '△',  name: 'FIELD',            rolle: 'user',    energie: 0.6 },
  { stufe: 7,  zeichen: '27', name: 'SYS.VEC',          rolle: 'user',    energie: 0.8 },
  { stufe: 8,  zeichen: '▣',  name: 'LIVE.team',        rolle: 'admin',   energie: 0.9 },
  { stufe: 9,  zeichen: '3↺', name: 'DEEPSPACENINE',    rolle: 'admin',   energie: 1.0 },
  { stufe: 10, zeichen: '0',  name: 'COORD0',           rolle: 'neutral', energie: 0.5 },
];

/* ═══════════════════════════════════════════════════════════
   DAS RADAR
   ═══════════════════════════════════════════════════════════ */

export const RADAR = {

  name: 'RADAR',
  tmp: TMP,
  knoten: KNOTEN,

  /* ─── ZUSTAND ─────────────────────────────────── */
  position: 0,
  besucht: new Set([0]),
  echo: [],
  würfe: 0,

  /* ─── GRAVITATION ────────────────────────────────
     Jeder Knoten zieht an.
     Die Stärke hängt von der Energie ab.
     Kein Zufall. Rechnung.
  ─────────────────────────────────────────────────── */
  gravitation(von, nach){
    const a = this.knoten[von];
    const b = this.knoten[nach];
    if(!a || !b) return 0;
    return 1 - Math.abs(a.energie - b.energie);
  },

  /* ─── GATE · Tür mit Echo ────────────────────────
     Ein Sprung von A nach B.
     Jede Tür macht einen Klang.
     Der Klang bleibt.
  ─────────────────────────────────────────────────── */
  springen(nach){
    if(nach < 0 || nach >= this.knoten.length) return null;
    const von = this.position;
    const g = this.gravitation(von, nach);

    const klang = {
      von: this.knoten[von].name,
      nach: this.knoten[nach].name,
      stärke: g,
      zeit: new Date().toISOString(),
    };
    this.echo.push(klang);
    if(this.echo.length > 100) this.echo.shift();

    this.position = nach;
    this.besucht.add(nach);
    this.würfe++;

    return klang;
  },

  /* ─── WURMLOCH · Abkürzung ───────────────────────
     Kein Umweg über jede Stufe.
     Direkt von A nach B.
     Nur erlaubt, wenn beide schon besucht wurden.
  ─────────────────────────────────────────────────── */
  wurmloch(nach){
    if(!this.besucht.has(nach)){
      return { ok: false, grund: 'ziel nicht besucht · kein wurmloch' };
    }
    if(nach === this.position){
      return { ok: false, grund: 'schon da' };
    }
    return {
      ok: true,
      von: this.knoten[this.position].name,
      nach: this.knoten[nach].name,
      zeit: new Date().toISOString(),
    };
  },

  /* ─── HIGHWAY · der Lauf ─────────────────────────
     Ein Durchlauf durch alle Stufen.
     Nicht springen. Gehen.
  ─────────────────────────────────────────────────── */
  highway(){
    const spur = [];
    for(let i = 0; i < this.knoten.length; i++){
      const k = this.knoten[i];
      spur.push({
        stufe: k.stufe,
        zeichen: k.zeichen,
        name: k.name,
        rolle: k.rolle,
      });
    }
    return spur;
  },

  /* ─── ECHO HALL ─────────────────────────────────
     Alle Sprünge, die erklangen.
  ─────────────────────────────────────────────────── */
  echoHall(){
    return this.echo.slice();
  },

  /* ─── SELBSTAUSKUNFT ───────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      stufen: this.knoten.length,
      position: this.position,
      besucht: this.besucht.size,
      würfe: this.würfe,
      form: 'circle · gate · wurmloch · gravitation',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'jede stufe ist ein knoten · jeder sprung ist ein gate · jeder weg ist ein wurmloch',
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { KNOTEN, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  RADAR · circle-navigation · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  stufen ·', KNOTEN.length);
console.log('  highway · ◉ → 3 → 9 → ◎ → 81 → ◆ → △ → 27 → ▣ → 3↺ → 0');
console.log('  gate · tür mit echo');
console.log('  wurmloch · abkürzung für besuchte orte');
console.log('');
