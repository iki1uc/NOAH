/* ═══════════════════════════════════════════════════════════
   atom.js · die vier · iki1uc · kader
   ═══════════════════════════════════════════════════════════
   Vier stoffe. Zwei pole. Ein atem. Ein frieden.

   Ehrlich heißt:
     O2 steigt → CO2 fällt. Nicht zufällig. Chemie.
     H2O folgt träge — wasser hat gedächtnis.
     Kern atmet langsam — atom ist geduld.

   Frieden heißt:
     nicht gleich. sondern: niemand verliert.
     alle im band um die mitte.
   ═══════════════════════════════════════════════════════════ */

export const ATOM = {

  // Zustand — die vier stoffe
  o2:   0.60,
  co2:  0.60,
  h2o:  0.60,
  kern: 0.60,

  // Atem-takt: 8 sekunden ein zyklus
  atemDauer: 8000,

  // Mitte und Band — das frieden-fenster
  mitte: 0.60,
  band:  0.15,

  /* ─── ATME ────────────────────────────────────────
     t = zeit in ms
     gibt den neuen zustand zurück
  ─────────────────────────────────────────────────── */
  atme(t){
    const phase = (t % this.atemDauer) / this.atemDauer;

    // Einatmen (0.0 – 0.5): O2 hoch · CO2 runter
    // Ausatmen (0.5 – 1.0): umgekehrt
    const einatmen = phase < 0.5
      ? Math.sin(phase * Math.PI)      // 0 → 1 → 0
      : -Math.sin((phase - 0.5) * Math.PI); // 0 → -1 → 0

    const delta = einatmen * 0.004;

    this.o2  = Math.max(0, Math.min(1, this.o2  + delta));
    this.co2 = Math.max(0, Math.min(1, this.co2 - delta));

    // H2O träge — folgt langsam
    this.h2o = Math.max(0, Math.min(1, this.h2o + delta * 0.15));

    // Kern atmet ruhig — atom ist geduld
    this.kern = 0.5 + Math.sin(t * 0.0004) * 0.25;

    return this.zustand();
  },

  /* ─── ZUSTAND ─────────────────────────────────────
     gibt zurück: die vier + atem + frieden
  ─────────────────────────────────────────────────── */
  zustand(){
    return {
      o2:   this.o2,
      co2:  this.co2,
      h2o:  this.h2o,
      kern: this.kern,
      atem: this.o2 - this.co2,   // überschuss: wer hat mehr
      frieden: this.istFrieden(),
      waage: this.waage(),
    };
  },

  /* ─── FRIEDEN ─────────────────────────────────────
     alle vier im band um die mitte
     nicht gleich — aber nah beieinander
  ─────────────────────────────────────────────────── */
  istFrieden(){
    const nah = (x) => Math.abs(x - this.mitte) < this.band;
    return nah(this.o2) && nah(this.co2)
        && nah(this.h2o) && nah(this.kern);
  },

  /* ─── WAAGE ───────────────────────────────────────
     wie weit ist jeder stoff von der mitte weg?
     0 = in der mitte · 1 = ganz außen
  ─────────────────────────────────────────────────── */
  waage(){
    const d = (x) => Math.abs(x - this.mitte);
    return {
      o2:   d(this.o2),
      co2:  d(this.co2),
      h2o:  d(this.h2o),
      kern: d(this.kern),
    };
  },

  /* ─── DER SATZ ──────────────────────────────────── */
  satz: 'o2 und co2 sind gegenpole · atem bewegt sie · frieden ist das band',
};
