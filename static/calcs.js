import { elements } from "./elements.js";

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

const ecrLabels = {
  12: document.querySelector('label[for="ecr12"]'),
  15: document.querySelector('label[for="ecr15"]'),
  25: document.querySelector('label[for="ecr25"]')
};

export function calc() {
  var mmBore = Number(elements.mmBore.value);
  var mmStroke = Number(elements.mmStroke.value);
  var cCyl = Number(elements.cCyl.value);
  let dis = displacement(mmBore, mmStroke, cCyl);
  updateDisplayValue("ccDisp", dis);

  var rev = Number(elements.revLimit.value);
  let ps = (mmStroke * 2 / 1000) * (rev / 60);
  updateDisplayValue("msPistonSpeed", ps.toFixed(2));

  let mrpm = getMaxRPM(mmStroke);
  updateDisplayValue("mRPM", mrpm.toFixed(2));

  var cr = Number(elements.compRatio.value);
  var ve = Number(elements.ve.value/100);
  let eHP = estHP(dis, rev, cr, ve);
  updateDisplayValue("eHP", eHP);

  let mHP = estHP(dis, mrpm, cr, ve);
  updateDisplayValue("mHP", mHP);
}
