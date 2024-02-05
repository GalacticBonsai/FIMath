import { updateSliderValues } from "./slider.js";


function displacement(bore, stroke, cylender) {
  var ccDisp = (Math.PI / 4) * (bore / 10) ** 2 * (stroke / 10) * cylender;
  return ccDisp;
}

function getMaxRPM(stroke) {
  return (25 * 30000) / stroke;
}

export function estHP(displacement, rpm, cr, ve) {
  return (displacement / 1000) * (rpm / 1000) * cr * ve;
}

function updateDisplayValue(id, value) {
  document.getElementById(id).textContent = Math.floor(value);
}

export function calc() {
  var mmBore = Number(document.getElementById("mmBore").value);
  var mmStroke = Number(document.getElementById("mmStroke").value);
  var cCyl = Number(document.getElementById("cCyl").value);
  let dis = displacement(mmBore, mmStroke, cCyl);
  updateDisplayValue("ccDisp", dis);

  var rev = Number(document.getElementById("revLimit").value);
  let ps = (mmStroke * 2 / 1000) * (rev / 60);
  updateDisplayValue("msPistonSpeed", ps.toFixed(2));

  let mrpm = getMaxRPM(mmStroke);
  updateDisplayValue("mRPM", mrpm.toFixed(2));

  var cr = Number(document.getElementById("compRatio").value);
  var ve = Number(document.getElementById("ve").value/100);
  let eHP = estHP(dis, rev, cr, ve);
  updateDisplayValue("eHP", eHP);

  let mHP = estHP(dis, mrpm, cr, ve);
  updateDisplayValue("mHP", mHP);
}

updateSliderValues(['mmBore', 'mmStroke', 'cCyl', 'compRatio', 'revLimit', 've', 'boostPsi'], calc);
