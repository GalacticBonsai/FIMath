const atmosphere = 14.7;

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
  const inputIds = ['mmBore', 'mmStroke', 'cCyl', 'CompRatio', 'RevLimit', 'RatedHP', 'boostPsi'];

  inputIds.forEach(id => {
    const rangeId = id + 'Range';
    const inputRange = document.getElementById(rangeId);
    const inputText = document.getElementById(id);

    inputRange.addEventListener('input', function() {
      inputText.value = inputRange.value;
      updateEcr();
    });

    inputText.addEventListener('input', function() {
      inputRange.value = inputText.value;
      updateEcr();
    });
  });
}

const ecr12Label = document.querySelector('label[for="ecr12"]');
const ecr15Label = document.querySelector('label[for="ecr15"]');
const ecr25Label = document.querySelector('label[for="ecr25"]');

function updateEcr(){
    var cr = Number(document.getElementById("CompRatio").value);
    const boostValue = Number(document.getElementById("boostPsi").value);

    // Calculate ECR values based on boost PSI
    const ecr12Value = atmosphere*(12/cr-1);
    const ecr15Value = atmosphere*(15/cr-1);
    const ecr25Value = atmosphere*(25/cr-1);

    let ehp = document.getElementById("eHP").textContent;
    const hp12 = ehp*((atmosphere+ecr12Value)/atmosphere);
    const hp15 = ehp*((atmosphere+ecr15Value)/atmosphere);
    const hp25 = ehp*((atmosphere+ecr25Value)/atmosphere);


    // Update label texts with calculated ECR values
    ecr12Label.textContent = `12 ECR (${ecr12Value.toFixed(2)} PSI) (${hp12.toFixed(2)})`;
    ecr15Label.textContent = `15 ECR (${ecr15Value.toFixed(2)} PSI) (${hp15.toFixed(2)})`;
    ecr25Label.textContent = `25 ECR (${ecr25Value.toFixed(2)} PSI) (${hp25.toFixed(2)})`;

    // Toggle red-label class based on boost value
    ecr12Label.classList.toggle('red-label', boostValue > ecr12Value);
    ecr15Label.classList.toggle('red-label', boostValue > ecr15Value);
    ecr25Label.classList.toggle('red-label', boostValue > ecr25Value);
};

// Get references to elements
const presetsDropdown = document.getElementById('presets');
const mmBoreRange = document.getElementById('mmBoreRange');
const mmStrokeRange = document.getElementById('mmStrokeRange');
const cCylRange = document.getElementById('cCylRange');
const revLimitRange = document.getElementById('RevLimitRange');
const compRatioRange = document.getElementById('CompRatioRange');
const ratedHPRange = document.getElementById('RatedHPRange');


// Define presets
const presets = {
  Nissan_370z: {
      mmBore: 95.5,
      mmStroke: 86,
      cCyl: 6,
      revLimit: 7500,
      compRatio: 11,
      ratedHP: 332
  },
  Mitsubishi_EvoX: {
      mmBore: 86,
      mmStroke: 86,
      cCyl: 4,
      revLimit: 7600,
      compRatio: 9,
      ratedHP: 287
  }
  // Add more presets as needed
};

// Function to populate the presets dropdown
function populatePresetsDropdown() {
  const presetsDropdown = document.getElementById('presets');

  // Loop through the presets and add options to the dropdown
  for (const preset in presets) {
      if (presets.hasOwnProperty(preset)) {
          const option = document.createElement('option');
          option.value = preset;
          option.textContent = preset.charAt(0).toUpperCase() + preset.slice(1); // Capitalize first letter
          presetsDropdown.appendChild(option);
      }
  }
}

// Function to handle preset selection
function handlePresetSelection() {
  const selectedPreset = presets[presetsDropdown.value];
  if (selectedPreset) {
    // Set values based on selected preset
    mmBore.value = selectedPreset.mmBore;
    mmStroke.value = selectedPreset.mmStroke;
    cCyl.value = selectedPreset.cCyl;
    revLimit.value = selectedPreset.revLimit;
    compRatio.value = selectedPreset.compRatio;
    ratedHP.value = selectedPreset.ratedHP;
  const inputIds = ['mmBore', 'mmStroke', 'cCyl', 'CompRatio', 'RevLimit', 'RatedHP', 'boostPsi'];

  inputIds.forEach(id => {
    const rangeId = id + 'Range';
    const inputRange = document.getElementById(rangeId);
    const inputText = document.getElementById(id);

    
    inputRange.value = inputText.value;
    });
  }
}

// Run on page load
populatePresetsDropdown();
handlePresetSelection(); // Set initial values based on selected preset

// Call the function to set up event listeners
presetsDropdown.addEventListener('change', handlePresetSelection);
updateSliderValues();