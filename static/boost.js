import { atmosphere, elements } from "./elements.js";
import { estHP } from "./calcs.js";

function boostRatio(atmosphere, psi) {
 return ((atmosphere + psi) / atmosphere);
}

export function boostCalc() {
  var cr = Number(elements.compRatio.value);
  const boostValue = Number(elements.boostPsi.value);
  var disp = Number(elements.displacement.textContent);
  var rev = Number(elements.revLimit.value);
  var cr = Number(elements.compRatio.value);
  var maxECR = Number(elements.maxECR.textContent);

  // update est HP based on CR, HP, and Boost PSI
  var ehp = estHP(disp,rev,cr,1);
  
  var br = boostRatio(atmosphere,boostValue);
  document.getElementById("boostHP").textContent = Math.floor(ehp * br);
  var ecr = (cr*br).toFixed(1);
  elements.ecr.textContent = ecr;

  const ecrLabel = document.getElementById('ecr');

  if (ecr > maxECR) {
      ecrLabel.classList.add('red-label');
  } else {
      ecrLabel.classList.remove('red-label');
  }
}

document.getElementById("boostPsiRange").addEventListener('change', boostCalc);
document.getElementById("boostPsi").addEventListener('change', boostCalc);
