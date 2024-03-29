import { updateSliderValues } from "./slider.js";
import {calculateECR} from "./fuel.js"

export const atmosphere_sea_level = 14.7;

function boostRatio(atmosphere, psi) {
 return ((atmosphere + psi) / atmosphere);
}

function altitude_pressure(alt){
  return atmosphere_sea_level/(alt/1000);
}

export function boostCalc() {
  var cr = Number(document.getElementById("compRatio").value);
  const boostValue = Number(document.getElementById("boostPsi").value);
  var maxECR = Number(document.getElementById("maxECR").textContent);
  var ehp = Number(document.getElementById("nahp").value);
  // var altitude = Number(document.getElementById("altitude").value);

  var br = boostRatio(atmosphere_sea_level,boostValue);

  document.getElementById("boostHP").textContent = Math.floor(ehp * br);
  var ecr = (cr*br).toFixed(1);
  
  const ecrLabel = document.getElementById('ecr');
  ecrLabel.textContent = ecr;

  if (ecr > maxECR) {
      ecrLabel.classList.add('red-label');
  } else {
      ecrLabel.classList.remove('red-label');
  }
}

// Add event listener for fuel type selection
updateSliderValues(['boostPsi', 'compRatio', 'nahp', 'altitude'], boostCalc);
document.getElementById('fuelType').addEventListener('input', calculateECR);