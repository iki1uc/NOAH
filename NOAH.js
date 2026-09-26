/* ═══════════════════════════════════════════════════════════
   NOAH.js · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Jede Funktion tut eine Sache.
   Jede Station ist militär + schach + wetter + fußball.
   Jede Kraft ist aura · zen · mana.
   Jede Naturgewalt ist unter Kontrolle — nutzbar, nicht regierend.

   NOAH hält seinen guten Namen.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DIE VIER KÖNIGE ────────────────────────────────── */
/* Jeder König: rang · figur · wetter · position */

const KÖNIGE = {

  OS: {
    rang:     'General',
    figur:    'König',
    wetter:   'Sonne',
    position: 'Torwart',
    aufgabe:  'sieht alles',
  },

  BOOT: {
    rang:     'Oberst',
    figur:    'Dame',
    wetter:   'Wind',
    position: 'Verteidiger',
    aufgabe:  'startet alles',
  },

  '243': {
    rang:     'Major',
    figur:    'Turm',
    wetter:   'Regen',
    position: 'Mittelfeld',
    aufgabe:  'verarbeitet alles',
  },

  iki1uc: {
    rang:     'Hauptmann',
    figur:    'Springer',
    wetter:   'Nebel',
    position: 'Stürmer',
    aufgabe:  'ordnet alles',
  },
};

/* ─── DIE DREI KRÄFTE ────────────────────────────────── */
/* Mirroring: jede ist alles, muss aber nicht */

const KRÄFTE = {

  aura: {
    wert:  0.5,
    farbe: '#ffd93d',
    kann:  ['führen', 'tragen', 'leuchten'],
  },

  zen: {
    wert:  0.5,
    farbe: '#8cf0d0',
    kann:  ['ruhen', 'halten', 'atmen'],
  },

  mana: {
    wert:  0.5,
    farbe: '#b388ff',
    kann:  ['wandeln', 'formen', 'fließen'],
  },
};

/* ─── DIE ZWEI NATURGEWALTEN ─────────────────────────── */
/* Unter Kontrolle. Nutzbar. Nicht regierend. */

const NATURGEWALTEN = {

  elDiablo: {
    name:   'El Diablo',
    art:    'Feuer',
    status: 'unter Kontrolle',
    dient:  'Energie für Wandel',
  },

  elBurro: {
    name:   'El Burro',
    art:    'Erde',
    status: 'unter Kontrolle',
    dient:  'Energie für Last',
  },
};

/* ─── NOAH ───────────────────────────────────────────── */
const NOAH = {
  name:  'NOAH',
  titel: 'Kaiser',
  führt: 'tmp',
  hält:  'seinen guten Namen',
  tmp:   TMP,

  könige:      KÖNIGE,
  kräfte:      KRÄFTE,
  naturgewalten: NATURGEWALTEN,

  /* ─── booten ────────────────────────────────────── */
  boot(){
    console.log('🌊 NOAH · boot');
    console.log('👑 die vier könige ·', Object.keys(KÖNIGE).join(' · '));
    console.log('✨ die drei kräfte ·', Object.keys(KRÄFTE).join(' · '));
    console.log('🔥 die zwei naturgewalten ·',
                Object.values(NATURGEWALTEN).map(n => n.name).join(' · '));
    return 'boot';
  },

  /* ─── einen könig rufen ─────────────────────────── */
  ruf(name){
    const k = this.könige[name];
    if(!k){ console.warn('kein könig ·', name); return null; }
    console.log(`👑 ${name} · ${k.rang} · ${k.figur} · ${k.wetter} · ${k.position}`);
    return k;
  },

  /* ─── eine kraft setzen ─────────────────────────── */
  setzeKraft(name, wert){
    const k = this.kräfte[name];
    if(!k) return null;
    k.wert = Math.max(0, Math.min(1, wert));
    return k;
  },

  /* ─── naturgewalt nutzen ───────────────────────── */
  nutze(name){
    const n = this.naturgewalten[name];
    if(!n){ console.warn('keine naturgewalt ·', name); return null; }
    console.log(`🔥 ${n.name} · ${n.art} · ${n.status} · dient: ${n.dient}`);
    return n;
  },

  /* ─── selbstauskunft ───────────────────────────── */
  was(){
    return {
      name: this.name,
      titel: this.titel,
      führt: this.führt,
      hält: this.hält,
      tmp: this.tmp.wahrheit,
      könige: Object.keys(this.könige),
      kräfte: Object.keys(this.kräfte),
      naturgewalten: Object.values(this.naturgewalten).map(n => n.name),
    };
  },

  /* ─── anmerkung ────────────────────────────────── */
  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { NOAH, KÖNIGE, KRÄFTE, NATURGEWALTEN };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  vier könige ·', Object.keys(KÖNIGE).length);
console.log('  drei kräfte ·', Object.keys(KRÄFTE).length);
console.log('  zwei naturgewalten ·', Object.keys(NATURGEWALTEN).length);
console.log('  NOAH hält seinen guten namen.');
console.log('');
