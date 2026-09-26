/* atom.js */
export const ATOM = {
  // Zustand
  o2: 0.84,   // sauerstoff
  co2: 0.68,  // kohlendioxid
  h2o: 0.76,  // wasser
  kern: 0.72, // atom-kern (aktivität)
  
  // Atem: 4 Sekunden ein, 4 Sekunden aus (8s Zyklus)
  atemDauer: 8000,
  
  // Der Kern der Wahrheit:
  // O2 und CO2 sind Gegenpol. Wenn das eine steigt,
  // fällt das andere. Das ist kein Zufall — das ist chemie.
  
  atme(t){
    const phase = (t % this.atemDauer) / this.atemDauer;
    
    // 0.0 – 0.5: einatmen (O2 rein, CO2 raus)
    // 0.5 – 1.0: ausatmen (CO2 rein, O2 raus)
    let einatmen;
    if(phase < 0.5){
      // sanft: ease in-out
      einatmen = Math.sin(phase * Math.PI); // 0 → 1 → 0
    } else {
      einatmen = -Math.sin((phase - 0.5) * Math.PI); // 0 → -1 → 0
    }
    
    // O2 und CO2 sind gegenläufig
    const delta = einatmen * 0.008;
    this.o2 = Math.max(0, Math.min(1, this.o2 + delta));
    this.co2 = Math.max(0, Math.min(1, this.co2 - delta));
    
    // H2O: träge. folgt langsam dem atem
    this.h2o = Math.max(0, Math.min(1, this.h2o + delta * 0.2));
    
    // Kern: die aktivität. atmet mit, aber ruhiger.
    this.kern = 0.5 + Math.sin(t * 0.0005) * 0.3;
    
    return this.zustand();
  },
  
  zustand(){
    return {
      o2: this.o2,
      co2: this.co2,
      h2o: this.h2o,
      kern: this.kern,
      atem: this.o2 - this.co2, // überschuss
      frieden: this.istFrieden(),
    };
  },
  
  // FRIEDEN = alle vier im band.
  // Nicht: alle gleich. Sondern: niemand verliert.
  istFrieden(){
    const band = 0.15;
    const mitte = 0.6;
    const nah = (x) => Math.abs(x - mitte) < band;
    return nah(this.o2) && nah(this.co2) && nah(this.h2o) && nah(this.kern);
  },
  
  // Waage: wie weit von der mitte entfernt
  waage(){
    const dist = (x) => Math.abs(x - 0.6);
    return {
      o2: dist(this.o2),
      co2: dist(this.co2),
      h2o: dist(this.h2o),
      kern: dist(this.kern),
    };
  },
};
