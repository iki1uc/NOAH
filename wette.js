/* ═══════════════════════════════════════════════════════════
   wette.js · NOAH · iki1uc
   ═══════════════════════════════════════════════════════════
   TMP · RÄRE WAHRHEIT

   Einzelurteil. Keine Importe.

   Jeder darf wetten.
   Ich mache Gegenwette nach 24h Lauf.

   Angebot: 7/24 · hälfte aller vorhandenen.
   Preis: 21% rechenpower aller vorhandenen.
   Mit 42: ertrag um 1/3 erhöhen.
   Nur bei dreifach ja + digital verify.

   Team gegen Team. Koop Pook Lauf.
   30 Tage · 28 volle tage pflicht.
   Sonst: kündigung · guthaben an welthungerhilfe.

   Ban: 7 tage minimum · 30 tage bei wiederholung.
   3x aufgefallen → 3x schwieriger.
   Entbann möglich bei nicht-wiederholungstätern.

   Alles wegen waage und sonne.
   Ehrlich währt am längsten.
   ═══════════════════════════════════════════════════════════ */

const TMP = {
  aktiv: true,
  wahrheit: 'tmp · räre wahrheit',
  seit: new Date().toISOString(),
};

/* ─── DIE REGELN ──────────────────────────────────────── */
const REGELN = {
  // zeit
  lauf_stunden:        24,
  angebot_stunden:     7 * 24,
  berechnung_tage:     30,
  pflicht_tage:        28,
  spielraum_tage:      2,

  // einsatz
  haelfte:             0.5,
  rechenpower_preis:   0.21,
  rechenpower_bonus:   42,        // 42 → ertrag +1/3
  bonus_faktor:        1 / 3,

  // ja-pflicht
  dreifach_ja:         3,

  // ban
  ban_min_tage:        7,
  ban_wiederholung:    30,
  ban_faktor:          3,
};

/* ─── DIE URSACHE · die wette ─────────────────────────── */
const URSACHE = {
  wetten: [],

  /* jeder darf wetten */
  setze(wem, einsatz, ziel){
    if(!wem || einsatz <= 0) return { ok: false, grund: 'ungültig' };
    const wette = {
      id: 'w_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
      wem,
      einsatz,
      ziel,
      lauf_start: new Date().toISOString(),
      lauf_stunden: REGELN.lauf_stunden,
      status: 'aktiv',
    };
    this.wetten.push(wette);
    return wette;
  },
};

/* ─── DIE WIRKUNG · die gegenwette ────────────────────── */
const WIRKUNG = {
  gegenwetten: [],

  /* nach 24h lauf: ich mache gegenwette */
  macheGegenwette(wette){
    if(!wette || wette.status !== 'aktiv'){
      return { ok: false, grund: 'wette nicht aktiv' };
    }
    const gegen = {
      id: 'g_' + wette.id,
      gegen_wette: wette.id,
      anbieter: 'iki1uc',
      angebot: wette.einsatz * REGELN.haelfte,
      angebot_stunden: REGELN.angebot_stunden,
      preis: wette.einsatz * REGELN.rechenpower_preis,
      bonus: REGELN.rechenpower_bonus,
      bonus_faktor: REGELN.bonus_faktor,
      ja_pflicht: REGELN.dreifach_ja,
      verify_pflicht: true,
      zeit: new Date().toISOString(),
    };
    this.gegenwetten.push(gegen);
    return gegen;
  },
};

/* ─── DAS DREIFACH JA + VERIFY ────────────────────────── */
const DREIFACH_JA = {
  bestimmung: false,
  nutzung: false,
  nutzend: false,
  digital_verify: null,   // ein hash, nicht fälschbar

  setzeBestimmung(j){ this.bestimmung = j === true; return this.bestimmung; },
  setzeNutzung(j){ this.nutzung = j === true; return this.nutzung; },
  setzeNutzend(j){ this.nutzend = j === true; return this.nutzend; },

  setzeVerify(hash){
    if(typeof hash !== 'string' || hash.length < 16){
      return { ok: false, grund: 'hash zu kurz' };
    }
    // nur akzeptieren, wenn dreifach ja voll
    if(!this.bestimmung || !this.nutzung || !this.nutzend){
      return { ok: false, grund: 'erst dreifach ja' };
    }
    this.digital_verify = hash;
    return { ok: true, verify: hash };
  },

  voll(){
    return this.bestimmung && this.nutzung && this.nutzend && !!this.digital_verify;
  },
};

/* ─── DER 30-TAGE-LAUF ────────────────────────────────── */
const LAUF30 = {
  läufe: [],

  starte(wetteId){
    const l = {
      wette: wetteId,
      start: new Date().toISOString(),
      tage_voll: 0,
      tage_leer: 0,
      status: 'aktiv',
      spielraum_genutzt: 0,
    };
    this.läufe.push(l);
    return l;
  },

  /* einen tag buchen: war er voll oder leer? */
  bucheTag(lauf, voll){
    if(!lauf || lauf.status !== 'aktiv') return null;
    if(voll){
      lauf.tage_voll++;
    } else {
      lauf.tage_leer++;
      if(lauf.spielraum_genutzt < REGELN.spielraum_tage){
        lauf.spielraum_genutzt++;
      } else {
        // spielraum aufgebraucht — geschäft gilt als gekündigt
        lauf.status = 'gekündigt';
      }
    }
    // wenn 30 tage erreicht: prüfen
    if(lauf.tage_voll + lauf.tage_leer >= REGELN.berechnung_tage){
      lauf.status = lauf.tage_voll >= REGELN.pflicht_tage
        ? 'erfüllt'
        : 'nicht_erfüllt';
    }
    return lauf;
  },

  /* was passiert bei kündigung? */
  wohinBeiKündigung(){
    return {
      empfaenger: 'Welthungerhilfe',
      nicht: 'iki1uc',
      grund: 'echte organisation · nicht ich',
      satz: 'guthaben geht an die, die es brauchen',
    };
  },
};

/* ─── TEAM GEGEN TEAM · KOOP POOK LAUF ────────────────── */
const KOOP = {
  teams: [],

  bildeTeam(name, mitglieder){
    const t = {
      name,
      mitglieder: Array.isArray(mitglieder) ? mitglieder.slice() : [],
      gegründet: new Date().toISOString(),
      aktionen: 0,
    };
    this.teams.push(t);
    return t;
  },

  bildeKoop(teamA, teamB, wetteId){
    if(!teamA || !teamB) return { ok: false, grund: 'zwei teams nötig' };
    return {
      teamA: teamA.name,
      teamB: teamB.name,
      wette: wetteId,
      modus: 'koop_pook_lauf',
      status: 'aktiv',
      seit: new Date().toISOString(),
    };
  },
};

/* ─── BAN-SYSTEM ──────────────────────────────────────── */
const BAN = {
  bücher: new Map(),   // wem → { auffälligkeiten, bis, faktor }

  auffallen(wem){
    if(!this.bücher.has(wem)){
      this.bücher.set(wem, { auffälligkeiten: 0, bis: null, faktor: 1 });
    }
    const b = this.bücher.get(wem);
    b.auffälligkeiten++;
    const tage = b.auffälligkeiten >= 3
      ? REGELN.ban_wiederholung * REGELN.ban_faktor
      : REGELN.ban_min_tage * (b.auffälligkeiten >= 2 ? REGELN.ban_faktor : 1);
    const bis = new Date(Date.now() + tage * 24 * 60 * 60 * 1000);
    b.bis = bis.toISOString();
    b.faktor = b.auffälligkeiten >= 3 ? REGELN.ban_faktor : b.faktor;
    return b;
  },

  istGebannt(wem){
    const b = this.bücher.get(wem);
    if(!b || !b.bis) return false;
    return Date.now() < new Date(b.bis).getTime();
  },

  entbannen(wem){
    const b = this.bücher.get(wem);
    if(!b) return { ok: false, grund: 'nie gebannt' };
    if(b.auffälligkeiten >= 3){
      return { ok: false, grund: 'wiederholungstäter · keine einfache entbannung' };
    }
    b.bis = null;
    return { ok: true, wem };
  },
};

/* ─── DIE WETTE · das objekt ──────────────────────────── */
export const WETTE = {
  name: 'WETTE',
  tmp: TMP,
  regeln: REGELN,
  ursache: URSACHE,
  wirkung: WIRKUNG,
  dreifach_ja: DREIFACH_JA,
  lauf30: LAUF30,
  koop: KOOP,
  ban: BAN,

  /* ─── DER GANZE LAUF ─────────────────────────────
     von wette → gegenwette → 30 tage → erfüllt oder nicht
  ─────────────────────────────────────────────────── */
  starte(wem, einsatz, ziel){
    const w = this.ursache.setze(wem, einsatz, ziel);
    const g = this.wirkung.macheGegenwette(w);
    const l = this.lauf30.starte(w.id);
    return { wette: w, gegenwette: g, lauf: l };
  },

  /* ─── MIT 42 · den ertrag erhöhen ──────────────── */
  mitBonus42(wette){
    if(!wette) return { ok: false, grund: 'keine wette' };
    return {
      ok: true,
      vorher: wette.einsatz,
      bonus: wette.einsatz * REGELN.bonus_faktor,
      nachher: wette.einsatz * (1 + REGELN.bonus_faktor),
      bedingung: 'dreifach ja + digital verify',
    };
  },

  /* ─── SELBSTAUSKUNFT ───────────────────────────── */
  was(){
    return {
      name: this.name,
      tmp: this.tmp.wahrheit,
      form: 'einzelurteil · keine importe',
      lauf: `${REGELN.lauf_stunden}h · ${REGELN.angebot_stunden}h angebot`,
      einsatz: `${REGELN.haelfte * 100}% · preis ${REGELN.rechenpower_preis * 100}%`,
      bonus: `${REGELN.rechenpower_bonus} → +${(REGELN.bonus_faktor * 100).toFixed(1)}%`,
      lauf_tage: `${REGELN.berechnung_tage} tage · ${REGELN.pflicht_tage} pflicht`,
      spielraum: `${REGELN.spielraum_tage} tage`,
      bei_kündigung: this.lauf30.wohinBeiKündigung().empfaenger,
      ban: `${REGELN.ban_min_tage} min · ${REGELN.ban_wiederholung} wiederholung · ×${REGELN.ban_faktor}`,
      satz: 'ehrlich währt am längsten',
    };
  },

  anmerkung(){
    return `${this.tmp.wahrheit} · seit ${this.tmp.seit}`;
  },

  satz: 'ehrlich währt am längsten · waage · sonne',
};

export { REGELN, URSACHE, WIRKUNG, DREIFACH_JA, LAUF30, KOOP, BAN, TMP };

console.log('');
console.log('  WETTE · NOAH · iki1uc');
console.log('  ─────────────────────────────────');
console.log('  TMP · RÄRE WAHRHEIT');
console.log('  lauf · 24h · angebot 7/24');
console.log('  einsatz · 50% · preis 21%');
console.log('  bonus · 42 → +1/3');
console.log('  lauf30 · 28 von 30 tagen pflicht');
console.log('  bei kündigung · Welthungerhilfe');
console.log('  ban · 7 min · 30 wiederholung · ×3');
console.log('  ehrlich währt am längsten');
console.log('');
