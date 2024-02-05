console.log("started engine");

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

export function updateSliderValues() {
  const inputIds = ['mmBore', 'mmStroke', 'cCyl', 'compRatio', 'revLimit', 've', 'boostPsi'];

  inputIds.forEach(id => {
    console.log('added listeners for ' + id);
    const rangeId = id + 'Range';
    const inputRange = document.getElementById(rangeId);
    const inputText = document.getElementById(id);

    if (inputRange && inputText) {
      const updatesliderValues = () => {
        inputText.value = inputRange.value;
        calc();
      };
      const updateTextValues = () => {
        inputRange.value= inputText.value;
        calc();
      };
      inputRange.addEventListener('input', updatesliderValues);
      inputText.addEventListener('input', updateTextValues);
    }
  });
}

console.log("imported engine.js");
updateSliderValues();