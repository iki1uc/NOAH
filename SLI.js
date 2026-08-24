// SLI.js — Sync-Link-Interface
// trägt OS, MXU, NC-Link, JB, RAW, Score, Slide

export const SLI = {

  attach(mod){
    mod.sli = true;
    mod.sli_state = "SYNCED";
    mod.sli_score = 0;
    mod.sli_slide = 0;

    mod.sli_addScore = v => {
      mod.sli_score += v;
      return mod.sli_score;
    };

    mod.sli_slideTo = v => {
      mod.sli_slide = v;
      return mod.sli_slide;
    };

    mod.sli_raw = (p,z) => p * z;

    mod.sli_check = () => ({
      status: mod.sli ? "OK" : "FAIL",
      score: mod.sli_score,
      slide: mod.sli_slide
    });

    return mod;
  }
};
