// brücke.js

// QI = Erkenntnis (Rolle, Ort, Home)
// IQQ = Weis (Suite, Bildung)
// Continuum = Zugang durch Qualität

function QI(rolle, ort, home) {
    // QI↑ = Summe der Tatbestands-Qualität
    return rolle + ort + home;
}

function IQQ(suite, bildung) {
    // IQQ↑ = Summe der Vorgangs-Qualität
    return suite + bildung;
}

function continuumZugang(qi, iqq) {
    const summe = qi + iqq;

    // VECTOR entscheidet den Zugang
    if (summe > 0) {
        return "Continuum geöffnet";
    } else {
        return "Continuum geschlossen";
    }
}

// Export für dein Repo
module.exports = {
    QI,
    IQQ,
    continuumZugang
};
