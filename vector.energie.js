// vector.energie.js
// Reine VECTOR-Energie-Mechanik

// QI = Reinheit des Tatbestands
function QI(rolle, ort, home) {
    return rolle + ort + home;
}

// IQQ = Reinheit des Vorgangs
function IQQ(suite, bildung) {
    return suite + bildung;
}

// VECTOR.ENERGIE = rohe Kraft vor der Bewegung
function VECTOR_ENERGIE(qi, iqq) {
    // 60% QI, 40% IQQ – deine Achsenlogik
    return (qi * 0.6) + (iqq * 0.4);
}

// Export
module.exports = {
    QI,
    IQQ,
    VECTOR_ENERGIE
};
