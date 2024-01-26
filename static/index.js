function displacement(bore, stroke, cylender){
  //console.log(`Bore: ${bore}, Stroke: ${stroke}, Cylinder Count: ${cylender}`);
  var ccDisp = (Math.PI / 4) * Math.pow((bore / 10), 2) * (stroke / 10) * cylender;
  //console.log(`Displacement: ${ccDisp}`);
  return ccDisp;
}

// Convert distance * rpm into m/s
function getPistonSpeed(stroke, rpm)
{
  var ps = stroke * 2/1000 * rpm/60;
  return ps
}

// Inverting the funciton to find rpm given stroke and 25m/s piston speed
function getMaxRPM(stroke){
  return 25 * 30000 / stroke;
}

function estHP(displacement, rpm, cr){
  // Need to add fuel adjustments. 
  // Basis for NA HP calculator
  return (displacement/1000)*(rpm/1000)*cr*(10/9);
}

function calc() {
  // Displacement update
  var mmBore = Number(document.getElementById("mmBore").value);
  var mmStroke = Number(document.getElementById("mmStroke").value);
  var cCyl = Number(document.getElementById("cCyl").value);
  let dis = displacement(mmBore, mmStroke, cCyl)
  document.getElementById("ccDisp").textContent = Math.floor(dis);

  // Measured Piston Speed
  var rev = Number(document.getElementById("RevLimit").value);
  let ps = getPistonSpeed(mmStroke, rev);
  document.getElementById("msPistonSpeed").textContent = ps.toFixed(2);

  // Start of Speculation
  let mrpm = getMaxRPM(mmStroke);
  document.getElementById("mRPM").textContent = mrpm.toFixed(2);

  var cr = Number(document.getElementById("CompRatio").value);
  let eHP = estHP(dis,rev,cr);
  document.getElementById("eHP").textContent = Math.floor(eHP);

  let mHP = estHP(dis,mrpm,cr);
  document.getElementById("mHP").textContent = Math.floor(mHP);

  var rHP = Number(document.getElementById("RatedHP").value);
  document.getElementById("mHPDiff").textContent = Math.floor(mHP - rHP);
}

// Function to update the displayed values next to the sliders
function updateSliderValues() {
  // Update Bore value
  document.getElementById('mmBoreValue').textContent = document.getElementById('mmBore').value;
  // Update Stroke value
  document.getElementById('mmStrokeValue').textContent = document.getElementById('mmStroke').value;
  // Update Cylinder Count value
  document.getElementById('cCylValue').textContent = document.getElementById('cCyl').value;
  // Update Compression Ratio value
  document.getElementById('CompRatioValue').textContent = document.getElementById('CompRatio').value;
  // Update Compression Ratio value
  document.getElementById('RevLimitValue').textContent = document.getElementById('RevLimit').value;
  // Update Compression Ratio value
  document.getElementById('RatedHPValue').textContent = document.getElementById('RatedHP').value;
}

// Event listeners to update the displayed values as the sliders change
document.getElementById('mmBore').addEventListener('input', function() {
  updateSliderValues();
});

document.getElementById('mmStroke').addEventListener('input', function() {
  updateSliderValues();
});

document.getElementById('cCyl').addEventListener('input', function() {
  updateSliderValues();
});

document.getElementById('CompRatio').addEventListener('input', function() {
  updateSliderValues();
});

document.getElementById('RevLimit').addEventListener('input', function() {
  updateSliderValues();
});

document.getElementById('RatedHP').addEventListener('input', function() {
  updateSliderValues();
});

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = getRandomColor();
ctx.fillRect(0, 0, 80, 80);

//https://www.w3schools.com/graphics/canvas_intro.asp
//https://www.w3schools.com/TAGs/