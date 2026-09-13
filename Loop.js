setInterval(()=>{
    RUNTIME.mainTick++;
    RUNTIME.atemPhase = (RUNTIME.atemPhase+1)%4;
    updateUI();
    updateAtem();
    updateMove();
}, 1000);
