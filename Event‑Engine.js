function doMove(){
    RUNTIME.move++;
    spawnParticles();
}

function doSein(state){
    RUNTIME.sein = state;
}

function doDjinn(){
    RUNTIME.djinn = !RUNTIME.djinn;
}
