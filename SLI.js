// ============================================================
// SLI.js · Wette + Slide · Synchronisation
// ============================================================

// SLI = Synchronisation Layer Interface
export const SLI = {
    wette: null,
    slide: null,
    status: 'bereit',
    history: []
};

// Wette: Eine Entscheidung unter Unsicherheit
SLI.setzeWette = function(name, einsatz, ziel) {
    const wette = {
        name,
        einsatz,
        ziel,
        status: 'aktiv',
        zeit: new Date().toISOString()
    };
    this.wette = wette;
    this.history.push({ typ: 'wette', ...wette });
    console.log(`🎲 SLI: Wette gesetzt → ${name} (Einsatz: ${einsatz})`);
    return wette;
};

// Slide: Ein Übergang von Zustand A nach B
SLI.slide = function(von, nach, payload) {
    const slide = {
        von,
        nach,
        payload,
        status: 'übergang',
        zeit: new Date().toISOString()
    };
    this.slide = slide;
    this.history.push({ typ: 'slide', ...slide });
    console.log(`🌊 SLI: Slide von ${von} → ${nach}`);
    return slide;
};

// SLI: Führt eine Aktion aus (Wette + Slide kombiniert)
SLI.aktion = function(wetteName, slideVon, slideNach, payload) {
    const w = this.setzeWette(wetteName, 1, slideNach);
    const s = this.slide(slideVon, slideNach, payload);
    return { wette: w, slide: s, status: 'kombiniert' };
};

export { SLI };
