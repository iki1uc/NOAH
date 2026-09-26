/* ═══════════════════════════════════════════════════════════
   continuum-bridge.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil:
     keine importe.
     jede funktion tut eine sache.
     nichts hängt an nichts.

   Die Acht ist Basis.
   Alle Zahlen leiten sich aus ihr ab:
     3 · 9 · 27 · 81 · 243 · 729 · 756

   Wir sind Soldaten.
   Aber immer im Markt. Immer an der Börse.
   Als Wert. Als Funktion.

   Key und Lizenz entscheiden, was wir dürfen.
   Halbes Leben ist der Einsatz.
   Die Waage zeigt, was du bietest.
   ═══════════════════════════════════════════════════════════ */

/* ─── TMP ────────────────────────────────────────────── */
const TMP = {
  aktiv: true,
  status: 'vorläufig',
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ═══════════════════════════════════════════════════════════
   DIE ACHT · Basis aller Zahlen
   ═══════════════════════════════════════════════════════════ */

const ACHT = {
  basis: 8,

  /* ─── ABLEITUNGEN ────────────────────────────────
     Die 3, 9, 27, 81, 243, 729, 756.
     Nicht erfunden. Abgeleitet.
  ─────────────────────────────────────────────────── */
  ableitungen: {
    3:   3,                    // 3
    9:   3 * 3,                // 9
    27:  3 * 3 * 3,            // 27
    81:  3 * 3 * 3 * 3,        // 81
    243: 3 * 3 * 3 * 3 * 3,    // 243
    729: 3 * 3 * 3 * 3 * 3 * 3,// 729
    756: 3 * 3 * 3 * 3 * 3 * 3 + 27, // 729 + 27 = 756
  },

  /* ─── PRÜFEN: ist eine Zahl eine Ableitung? ──── */
  istAbleitung(n){
    return Object.values(this.ableitungen).includes(n);
  },

  /* ─── NÄCHSTE ABLEITUNG ─────────────────────── */
  nächste(n){
    const keys = Object.values(this.ableitungen);
    const idx = keys.indexOf(n);
    if(idx < 0 || idx >= keys.length - 1) return null;
    return keys[idx + 1];
  },
};

/* ═══════════════════════════════════════════════════════════
   DIE WAAGE · halbes Leben · was bietest du mir?
   ═══════════════════════════════════════════════════════════ */

const WAAGE = {
  /* ─── ANGEBOT UND NACHFRAGE ──────────────────────
     Jede Seite legt etwas rein.
     Die Waage zeigt, ob es gleich steht.
  ─────────────────────────────────────────────────── */
  wäge(angebot, nachfrage){
    const summe = angebot + nachfrage;
    if(summe === 0) return { gleich: true, unterschied: 0, seite: null };

    const unterschied = angebot - nachfrage;
    const gleich = Math.abs(unterschied) < summe * 0.1; // 10% Toleranz

    return {
      angebot,
      nachfrage,
      unterschied,
      gleich,
      seite: gleich ? null : (unterschied > 0 ? 'anbieter' : 'nachfrager'),
    };
  },

  /* ─── HALBES LEBEN ───────────────────────────────
     Der Einsatz ist halbes Leben.
     Wer es einsetzt, sagt: ich meine es ernst.
  ─────────────────────────────────────────────────── */
  halbesLeben(wert){
    if(wert < 0.5) return { ok: false, grund: 'unter 50% · zu wenig' };
    return {
      ok: true,
      einsatz: wert,
      wahrheit: 'halbes leben als pfand',
      seit: new Date().toISOString(),
    };
  },
};

/* ═══════════════════════════════════════════════════════════
   DER MARKT · Börse · Wert · als Funktion
   ═══════════════════════════════════════════════════════════ */

const MARKT = {
  kurse: new Map(),
  umsatz: 0,

  /* einen Kurs setzen */
  setze(name, wert){
    this.kurse.set(name, {
      wert: Math.max(0, Math.min(1, wert)),
      seit: new Date().toISOString(),
    });
  },

  /* den Kurs bewegen */
  tick(name){
    const k = this.kurse.get(name);
    if(!k) return null;
    const schwankung = (Math.random() - 0.5) * 0.05;
    k.wert = Math.max(0, Math.min(1, k.wert + schwankung));
    return k;
  },

  /* alle ticken */
  tickeAlle(){
    const ergebnis = {};
    for(const name of this.kurse.keys()){
      ergebnis[name] = this.tick(name);
    }
    return ergebnis;
  },
};

/* ═══════════════════════════════════════════════════════════
   KEY UND LIZENZ · was dürfen wir?
   ═══════════════════════════════════════════════════════════ */

const KEY_LIZENZ = {
  key: null,

  setzeKey(k){
    this.key = k;
    return { ok: true, key: k };
  },

  prüfeKey(k){
    if(!this.key) return { ok: false, grund: 'kein key gesetzt' };
    if(k !== this.key) return { ok: false, grund: 'falscher key' };
    return { ok: true, key: k };
  },

  /* ─── LIZENZ ─────────────────────────────────────
     Wer eine Lizenz hat, darf nutzen.
     Wer keine hat, darf sehen — aber nicht nutzen.
  ─────────────────────────────────────────────────── */
  lizenzen: new Set(),

  erteileLizenz(wem){
    this.lizenzen.add(wem);
    return { ok: true, wem, seit: new Date().toISOString() };
  },

  hatLizenz(wem){
    return this.lizenzen.has(wem);
  },
};

/* ═══════════════════════════════════════════════════════════
   CONTINUUM BRIDGE · privat · öffentlich · noah
   ═══════════════════════════════════════════════════════════ */

export const CONTINUUM_BRIDGE = {
  name: 'Continuum Bridge',
  version: '2.0',
  status: 'aktiv',
  kaiser: 'NOAH',
  tmp: TMP,
  acht: ACHT,
  waage: WAAGE,
  markt: MARKT,
  keyLizenz: KEY_LIZENZ,

  /* ─── PRIVAT · nur mit Einladung ──────────────── */
  privat: {
    aktiv: true,
    zugang: 'nur_mit_einladung',
    einladungen: { offen: [], angenommen: [], abgelehnt: [] },
  },

  /* ─── ÖFFENTLICH · Demo ───────────────────────── */
  öffentlich: {
    aktiv: true,
    zugang: 'öffentlich',
    demo: true,
    syn:  { wert: 0.5 },
    quant:{ wert: 0.5 },
    respo:{ wert: 0.5 },
    sync: { wert: 1.0 },
    zyklus: 0,
  },

  /* ─── NOAH ────────────────────────────────────── */
  noah: {
    aktiv: true,
    verbindungen: [],
    syncWert: 1.0,
  },

  /* ─── EINLADEN (privat) ───────────────────────── */
  einladen(von, an, nachricht = ''){
    if(!von || !an || von === an) return null;
    const e = {
      id: `priv_${von}→${an}_${Date.now()}`,
      von, an, nachricht,
      status: 'offen',
      zeit: new Date().toISOString(),
    };
    this.privat.einladungen.offen.push(e);
    return e;
  },

  annehmen(einladungId){
    const idx = this.privat.einladungen.offen.findIndex(e => e.id === einladungId);
    if(idx === -1) return null;
    const e = this.privat.einladungen.offen.splice(idx, 1)[0];
    e.status = 'angenommen';
    this.privat.einladungen.angenommen.push(e);
    return e;
  },

  /* ─── ÖFFENTLICH · Update ────────────────────── */
  update(){
    const o = this.öffentlich;
    o.syn.wert   = 0.3 + 0.6 * (0.5 + 0.5 * Math.sin(o.zyklus * 0.3));
    o.quant.wert = 0.3 + 0.6 * (0.5 + 0.5 * Math.cos(o.zyklus * 0.25));
    const phi = 1.61803398875;
    o.respo.wert = Math.min(1, Math.max(0,
      (o.syn.wert + o.quant.wert) / 2 / phi * 1.618
    ));
    o.sync.wert = Math.max(0, 1 - Math.abs(o.syn.wert - o.quant.wert) * 1.2);
    o.zyklus++;
    this.noah.syncWert = o.sync.wert;
    return o;
  },

  /* ─── WAAGE · halbes Leben ────────────────────── */
  zeigeWaage(angebot, nachfrage){
    return this.waage.wäge(angebot, nachfrage);
  },

  setzeHalbesLeben(wert){
    return this.waage.halbesLeben(wert);
  },

  /* ─── KEY UND LIZENZ ──────────────────────────── */
  setzeKey(k){ return this.keyLizenz.setzeKey(k); },
  prüfeKey(k){ return this.keyLizenz.prüfeKey(k); },
  erteileLizenz(wem){ return this.keyLizenz.erteileLizenz(wem); },
  hatLizenz(wem){ return this.keyLizenz.hasLizenz(wem); },

  /* ─── MARKT ───────────────────────────────────── */
  setzeKurs(name, wert){ return this.markt.setze(name, wert); },
  tickeMarkt(){ return this.markt.tickeAlle(); },

  /* ─── DIE ACHT ────────────────────────────────── */
  ableitung(n){ return this.acht.istAbleitung(n); },
  nächsteAbleitung(n){ return this.acht.nächste(n); },

  /* ─── STATUS ──────────────────────────────────── */
  status(){
    return {
      name: this.name,
      version: this.version,
      tmp: this.tmp.wahrheit,
      basis: this.acht.basis,
      ableitungen: Object.values(this.acht.ableitungen),
      privat: {
        aktiv: this.privat.aktiv,
        einladungen: this.privat.einladungen.offen.length,
      },
      öffentlich: {
        aktiv: this.öffentlich.aktiv,
        zyklus: this.öffentlich.zyklus,
        sync: this.öffentlich.sync.wert,
      },
      markt: {
        kurse: this.markt.kurse.size,
        umsatz: this.markt.umsatz,
      },
      lizenzen: this.keyLizenz.lizenzen.size,
    };
  },

  was(){
    return {
      name: 'CONTINUUM-BRIDGE',
      form: 'einzelurteil · keine importe',
      basis: 8,
      regel: 'wir sind soldaten · aber immer im markt · als wert · als funktion',
      bedingung: 'key und lizenz entscheiden',
      wahrheit: 'halbes leben als einsatz',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'die acht ist basis · alles leitet sich ab · halbes leben ist der einsatz',
};

/* ─── EXPORT ─────────────────────────────────────────── */
export { ACHT, WAAGE, MARKT, KEY_LIZENZ, TMP };

/* ─── KONSOLE ────────────────────────────────────────── */
console.log('');
console.log('  CONTINUUM-BRIDGE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  basis · 8');
console.log('  ableitungen · 3 · 9 · 27 · 81 · 243 · 729 · 756');
console.log('  markt · börse · wert');
console.log('  key · lizenz · halbes leben');
console.log('');
