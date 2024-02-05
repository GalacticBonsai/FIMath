import { atmosphere } from "./consts.js";
import {calculateECR} from "fuel.js"
console.log("top of boost");

function boostRatio(atmosphere, psi) {
 return ((atmosphere + psi) / atmosphere);
}

export function boostCalc() {
  var cr = Number(document.getElementById(compRatio).value);
  const boostValue = Number(document.getElementById(boostPsi).value);
  var maxECR = Number(document.getElementById(maxECR).textContent);
  var hp = Number(document.getElementById("nahp").textContent);

  
  var br = boostRatio(atmosphere,boostValue);
  document.getElementById("boostHP").textContent = Math.floor(ehp * br);
  var ecr = (cr*br).toFixed(1);
  document.getElementById(ecr).textContent = ecr;

  const ecrLabel = document.getElementById('ecr');

  if (ecr > maxECR) {
      ecrLabel.classList.add('red-label');
  } else {
      ecrLabel.classList.remove('red-label');
  }
}

document.getElementById("boostPsiRange").addEventListener('change', boostCalc);
document.getElementById("boostPsi").addEventListener('change', boostCalc);

// Add event listener for fuel type selection
document.getElementById('fuelType').addEventListener('input', calculateECR);