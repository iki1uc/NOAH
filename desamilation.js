import { ASSIMILATION } from './assimilation.js';
import { MYCCOIN } from './myccoin.js';

// Assimilation · dreifach ja
ASSIMILATION.sageBestimmung('ahmet');
ASSIMILATION.sageNutzung('ahmet');
ASSIMILATION.sageNutzend('ahmet');
ASSIMILATION.istVogelfrei('ahmet');  // → true

// MYCCOIN
MYCCOIN.schürfen('ahmet', 100);
MYCCOIN.urheberAnteil(100);  // → { schürfer: 80, urheber: 20 }
MYCCOIN.stand('ahmet');      // → 100
MYCCOIN.übertragen('ahmet', 'iki1uc', 50);
MYCCOIN.setzeKurs(0.001, 80);
