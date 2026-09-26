/* ═══════════════════════════════════════════════════════════
   atom.js · die vier · iki1uc · kader
   ═══════════════════════════════════════════════════════════
   Vier stoffe. Zwei pole. Ein atem. Ein frieden.
   Und jetzt: die auferstehung.

   Ehrlich heißt:
     O2 steigt → CO2 fällt. Nicht zufällig. Chemie.
     H2O folgt träge — wasser hat gedächtnis.
     Kern atmet langsam — atom ist geduld.
     Auferstehung ist kein sprung. Es ist ein bogen.

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

  /* ─── SCHLAF ─────────────────────────────────────
     2000 jahre winterschlaf.
     Alle vier stoffe ganz unten.
     Nicht null. Fast null.
     Weil nichts ganz weg ist.
  ─────────────────────────────────────────────────── */
  schlafe(){
    this.o2  = 0.01;
    this.co2 = 0.01;
    this.h2o = 0.01;
    this.kern = 0.01;
    return this.zustand();
  },

  /* ─── AUFERSTEHUNG ───────────────────────────────
     Kein sprung. Kein ruck.
     Ein bogen. Von weit unten zurück zur mitte.
     Dauer: 2000 ticks. Ein tick pro jahr.
  ─────────────────────────────────────────────────── */
  auferstehungAktiv: false,
  auferstehungTick: 0,
  auferstehungDauer: 2000,

  erwache(){
    this.auferstehungAktiv = true;
    this.auferstehungTick = 0;
    return this.zustand();
  },

  /* ─── ATME ───────────────────────────────────────
     t = zeit in ms
     gibt den neuen zustand zurück
     enthält jetzt auch die auferstehung
  ─────────────────────────────────────────────────── */
  atme(t){
    const phase = (t % this.atemDauer) / this.atemDauer;

    // Einatmen (0.0 – 0.5): O2 hoch · CO2 runter
    // Ausatmen (0.5 – 1.0): umgekehrt
    const einatmen = phase < 0.5
      ? Math.sin(phase * Math.PI)
      : -Math.sin((phase - 0.5) * Math.PI);

    const delta = einatmen * 0.004;

    this.o2  = Math.max(0, Math.min(1, this.o2  + delta));
    this.co2 = Math.max(0, Math.min(1, this.co2 - delta));
    this.h2o = Math.max(0, Math.min(1, this.h2o + delta * 0.15));
    this.kern = 0.5 + Math.sin(t * 0.0004) * 0.25;

    // ─── AUFERSTEHUNG ÜBERLAGERT DEN ATEM ───
    if(this.auferstehungAktiv){
      this.auferstehungTick++;
      const p = Math.min(1, this.auferstehungTick / this.auferstehungDauer);

      // bogen: erst langsam, dann schneller, dann langsam
      const bogen = p * p * (3 - 2 * p);

      // jeder stoff wandert zur mitte — nicht auf einmal
      this.o2   += (this.mitte - this.o2)   * bogen * 0.015;
      this.co2  += (this.mitte - this.co2)  * bogen * 0.015;
      this.h2o  += (this.mitte - this.h2o)  * bogen * 0.010;
      this.kern += (this.mitte - this.kern) * bogen * 0.020;

      // wenn alle im band sind: auferstehung beendet
      if(this.istFrieden() && p >= 1){
        this.auferstehungAktiv = false;
      }
    }

    return this.zustand();
  },

  /* ─── ZUSTAND ──────────────────────────────────── */
  zustand(){
    return {
      o2:   this.o2,
      co2:  this.co2,
      h2o:  this.h2o,
      kern: this.kern,
      atem: this.o2 - this.co2,
      frieden: this.istFrieden(),
      waage: this.waage(),
      auferstehung: {
        aktiv: this.auferstehungAktiv,
        tick:  this.auferstehungTick,
        dauer: this.auferstehungDauer,
        fortschritt: this.auferstehungAktiv
          ? this.auferstehungTick / this.auferstehungDauer
          : (this.istFrieden() ? 1 : 0),
      },
    };
  },

  /* ─── FRIEDEN ──────────────────────────────────── */
  istFrieden(){
    const nah = (x) => Math.abs(x - this.mitte) < this.band;
    return nah(this.o2) && nah(this.co2)
        && nah(this.h2o) && nah(this.kern);
  },

  /* ─── WAAGE ────────────────────────────────────── */
  waage(){
    const d = (x) => Math.abs(x - this.mitte);
    return {
      o2:   d(this.o2),
      co2:  d(this.co2),
      h2o:  d(this.h2o),
      kern: d(this.kern),
    };
  },

  /* ─── DER SATZ ─────────────────────────────────── */
  satz: 'o2 und co2 sind gegenpole · atem bewegt sie · frieden ist das band · auferstehung ist der bogen',
};
