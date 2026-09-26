/* ═══════════════════════════════════════════════════════════
   co2.js · Clustering · Gravitation · Veteran · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Kein gut. Kein böse.
   Nur: Clustering und Gravitation.

   Was zusammengehört, zieht sich an.
   Was sich anzieht, bildet Cluster.
   Wer lange im Cluster trägt, wird Veteran.
   Veteranen tragen 50.001 % mehr.

   Reiner Lauf. Wie Runtime.
   Kein Import. Keine Abhängigkeit.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DIE VIER KENNZEICHEN ───────────────────────────── */
/* Jeder Knoten trägt alle vier. In unterschiedlicher Stärke. */
/* Naturgewalt · Soccer · Wetter · Schach */

const KENNZEICHEN = {
  naturgewalt: ['ruhe', 'wind', 'druck', 'zug'],
  soccer:      ['torwart', 'verteidiger', 'mittelfeld', 'stürmer'],
  wetter:      ['sonne', 'regen', 'nebel', 'schnee'],
  schach:      ['könig', 'dame', 'turm', 'springer'],
};

/* ─── DIE CLUSTER ────────────────────────────────────── */
/* Cluster = Gruppe von Knoten, die sich anziehen. */
/* Kein Zentrum. Kein Rand. Nur Anziehung. */

const CLUSTER = new Map();

/* ─── DIE VETERAN-AUFWERTUNG ─────────────────────────── */
/* 50.001 % mehr Kraft als Kalkül. */
/* Nicht als Bonus. Als Mindest-Voraussetzung. */
/* Wer Veteran ist, trägt mehr. Punkt. */

const VETERAN_FAKTOR = 1.50001;

/* ─── DER REINE LAUF ─────────────────────────────────── */
/* Kein Takt von außen. Nur der Lauf selbst. */
/* Er läuft, weil er läuft. */

const LAUF = {
  tick: 0,
  aktiv: true,
};

/* ─── CO2 ────────────────────────────────────────────── */
/* Kein Ding. Ein Prozess. */
/* Was reinkommt, wird geclustert. */

export const CO2 = {

  name: 'CO2',
  tmp: TMP,
  kennzeichen: KENNZEICHEN,
  cluster: CLUSTER,
  lauf: LAUF,

  /* ─── KNOTEN EINTRAGEN ────────────────────────────
     Jeder Knoten hat: name, kennzeichen, kraft.
     Er wird im Cluster eingetragen.
     Cluster = Schwerkraft-Feld.
  ─────────────────────────────────────────────────── */
  eintragen(name, kennzeichen, kraft = 1.0){
    const knoten = {
      name,
      kennzeichen: {
        naturgewalt: kennzeichen.naturgewalt || 'ruhe',
        soccer:      kennzeichen.soccer      || 'mittelfeld',
        wetter:      kennzeichen.wetter      || 'sonne',
        schach:      kennzeichen.schach      || 'könig',
      },
      kraft,
      veteran: false,
      seit: new Date().toISOString(),
      züge: 0,
    };

    CLUSTER.set(name, knoten);
    return knoten;
  },

  /* ─── GRAVITATION ─────────────────────────────────
     Zwei Knoten ziehen sich an.
     Die Anziehung hängt ab von:
       - gemeinsamen Kennzeichen
       - Differenz der Kraft
     Das ist keine Meinung. Das ist Rechnung.
  ─────────────────────────────────────────────────── */
  gravitation(a, b){
    const ka = CLUSTER.get(a);
    const kb = CLUSTER.get(b);
    if(!ka || !kb) return 0;

    let gleich = 0;
    let gesamt = 0;
    for(const feld of Object.keys(KENNZEICHEN)){
      gesamt++;
      if(ka.kennzeichen[feld] === kb.kennzeichen[feld]) gleich++;
    }

    const teilung = gleich / gesamt;              // 0..1
    const kraftA = ka.kraft;
    const kraftB = kb.kraft;
    const naehe  = 1 - Math.abs(kraftA - kraftB); // je ähnlicher, desto näher

    return teilung * naehe;
  },

  /* ─── CLUSTERING ──────────────────────────────────
     Alle Knoten werden nach Gravitation gruppiert.
     Was sich stark anzieht, kommt ins selbe Cluster.
     Ein Lauf. Kein Urteil.
  ─────────────────────────────────────────────────── */
  clustere(){
    const namen = Array.from(CLUSTER.keys());
    const gruppen = [];
    const besucht = new Set();

    for(const a of namen){
      if(besucht.has(a)) continue;
      const gruppe = [a];
      besucht.add(a);

      for(const b of namen){
        if(besucht.has(b)) continue;
        if(this.gravitation(a, b) > 0.5){
          gruppe.push(b);
          besucht.add(b);
        }
      }
      gruppen.push(gruppe);
    }

    return gruppen;
  },

  /* ─── VETERAN ─────────────────────────────────────
     Wer 1000 züge getragen hat, wird veteran.
     Veteranen bekommen 50.001 % mehr kraft.
     Nicht als Geschenk. Als Mindest-Voraussetzung.
  ─────────────────────────────────────────────────── */
  veteranWerden(name){
    const k = CLUSTER.get(name);
    if(!k) return null;
    if(k.züge < 1000) return { ok: false, grund: 'noch nicht bereit', züge: k.züge };
    k.veteran = true;
    k.kraft   = k.kraft * VETERAN_FAKTOR;
    return { ok: true, name, kraft: k.kraft, faktor: VETERAN_FAKTOR };
  },

  /* ─── ZUG ─────────────────────────────────────────
     Jeder zug erhöht den zähler.
     Bei 1000 wird der knoten automatisch veteran.
  ─────────────────────────────────────────────────── */
  zug(name){
    const k = CLUSTER.get(name);
    if(!k) return null;
    k.züge++;
    if(!k.veteran && k.züge >= 1000){
      this.veteranWerden(name);
    }
    return k;
  },

  /* ─── REINER LAUF ─────────────────────────────────
     Kein setInterval. Kein Takt von außen.
     Ein Schritt. Wer ihn ruft, ruft ihn.
     Wer ihn nicht ruft, ruft ihn nicht.
  ─────────────────────────────────────────────────── */
  schritt(){
    LAUF.tick++;
    for(const name of CLUSTER.keys()){
      this.zug(name);
    }
    return LAUF.tick;
  },

  /* ─── SELBSTAUSKUNFT ────────────────────────────── */
  was(){
    return {
      name: 'CO2',
      tmp: TMP.wahrheit,
      form: 'clustering · gravitation · veteran',
      cluster: CLUSTER.size,
      lauf: LAUF.tick,
      veteranFaktor: VETERAN_FAKTOR,
      regel: 'was zusammengehört, zieht sich an',
    };
  },

  anmerkung(){
    return `${TMP.wahrheit} · seit ${TMP.seit}`;
  },

  satz: 'clustering und gravitation · kein gut · kein böse · nur anziehung',
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { VETERAN_FAKTOR, KENNZEICHEN, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  CO2 · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  clustering · gravitation · veteran');
console.log('  veteran-faktor ·', VETERAN_FAKTOR);
console.log('  kein gut · kein böse · nur anziehung');
console.log('');
