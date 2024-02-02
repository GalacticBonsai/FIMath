// Import modules
import { updateSliderValues } from './ui.js';
import { populatePresetsDropdown } from './presets.js';
import { calc } from './calcs.js';
import { calculateECR } from './fuel.js';
import { boostCalc } from './boost.js';

// Call functions from modules
updateSliderValues();
populatePresetsDropdown();
calc();
calculateECR();
boostCalc();
