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
  document.getElementById("mHPDiff").textContent = Math.floor(eHP - rHP);
  document.getElementById("mRPMHPDiff").textContent = Math.floor(mHP - rHP);
  
}

// Function to update the displayed values next to the sliders
function updateSliderValues() {
  const inputIds = ['mmBore', 'mmStroke', 'cCyl', 'CompRatio', 'RevLimit', 'RatedHP'];

  inputIds.forEach(id => {
    const rangeId = id + 'Range';
    const inputRange = document.getElementById(rangeId);
    const inputText = document.getElementById(id);

    inputRange.addEventListener('input', function() {
      inputText.value = inputRange.value;
    });

    inputText.addEventListener('input', function() {
      inputRange.value = inputText.value;
    });
  });
}

// Call the function to set up event listeners
updateSliderValues();