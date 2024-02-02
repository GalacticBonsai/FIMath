const atmosphere = 14.7;
const elements = {
  mmBore: document.getElementById('mmBore'),
  mmStroke: document.getElementById('mmStroke'),
  cCyl: document.getElementById('cCyl'),
  revLimit: document.getElementById('revLimit'),
  compRatio: document.getElementById('compRatio'),
  ratedHP: document.getElementById('ratedHP'),
  boostPsi: document.getElementById('boostPsi')
};

function displacement(bore, stroke, cylender) {
  var ccDisp = (Math.PI / 4) * (bore / 10) ** 2 * (stroke / 10) * cylender;
  return ccDisp;
}

function getMaxRPM(stroke) {
  return (25 * 30000) / stroke;
}

function estHP(displacement, rpm, cr) {
  return (displacement / 1000) * (rpm / 1000) * cr * (10 / 9);
}

function updateDisplayValue(id, value) {
  document.getElementById(id).textContent = Math.floor(value);
}

function updateCalcs() {
  calc();
  updateEcr();
}

function updateSliderValues() {
  const inputIds = ['mmBore', 'mmStroke', 'cCyl', 'compRatio', 'revLimit', 'ratedHP', 'boostPsi'];

  inputIds.forEach(id => {
    console.log(`in id ${id}`)
    const rangeId = id + 'Range';
    const inputRange = document.getElementById(rangeId);
    const inputText = elements[id];

    if (inputRange && inputText) {
      const updatesliderValues = () => {
        inputText.value = inputRange.value;
        updateCalcs();
      };
      const updateTextValues = () => {
        inputRange.value= inputText.value;
        updateCalcs();
      };
      console.log(`Added listener for ${rangeId}`);
      inputRange.addEventListener('input', updatesliderValues);
      inputText.addEventListener('input', updateTextValues);
    }
  });
}


const ecrLabels = {
  12: document.querySelector('label[for="ecr12"]'),
  15: document.querySelector('label[for="ecr15"]'),
  25: document.querySelector('label[for="ecr25"]')
};

function updateEcr() {
  var cr = Number(elements.compRatio.value);
  const boostValue = Number(elements.boostPsi.value);
  const ehp = Number(document.getElementById("eHP").textContent);

  // update est HP based on CR, HP, and Boost PSI
  var boostRatio = ((atmosphere + boostValue) / atmosphere);
  document.getElementById("boostHP").textContent = Math.floor(ehp * boostRatio);
  document.getElementById("ecr").textContent = (cr*boostRatio).toFixed(1);

  for (const [value, label] of Object.entries(ecrLabels)) {
    const ecrValue = atmosphere * (value / cr - 1);
    const hpValue = ehp * ((atmosphere + ecrValue) / atmosphere);

    label.textContent = `${value} ECR (${ecrValue.toFixed(2)}PSI) (${hpValue.toFixed(2)}HP)`;
    label.classList.toggle('red-label', boostValue > ecrValue);
  }
}

function calc() {
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
  let eHP = estHP(dis, rev, cr);
  updateDisplayValue("eHP", eHP);

  let mHP = estHP(dis, mrpm, cr);
  updateDisplayValue("mHP", mHP);

  var rHP = Number(elements.ratedHP.value);
  updateDisplayValue("mHPDiff", eHP - rHP);
  updateDisplayValue("mRPMHPDiff", mHP - rHP);
}

const presetsDropdown = document.getElementById('presets');

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
  },
  Grom: {
    mmBore: 52.4,
    mmStroke: 57.9,
    cCyl: 1,
    revLimit: 7000,
    compRatio: 9.3,
    ratedHP: 9
  },
  Audi_R8_52: {
    mmBore: 84.5,
    mmStroke: 92.8,
    cCyl: 10,
    revLimit: 8000,
    compRatio: 12.5,
    ratedHP: 518
  }
};

function populatePresetsDropdown() {
  for (const preset in presets) {
    if (presets.hasOwnProperty(preset)) {
      const option = document.createElement('option');
      option.value = preset;
      option.textContent = preset.charAt(0).toUpperCase() + preset.slice(1); // Capitalize first letter
      presetsDropdown.appendChild(option);
    }
  }
}

function handlePresetSelection() {
  const selectedPreset = presets[presetsDropdown.value];
  if (selectedPreset) {
    elements.mmBore.value = selectedPreset.mmBore;
    elements.mmStroke.value = selectedPreset.mmStroke;
    elements.cCyl.value = selectedPreset.cCyl;
    elements.revLimit.value = selectedPreset.revLimit;
    elements.compRatio.value = selectedPreset.compRatio;
    elements.ratedHP.value = selectedPreset.ratedHP;

    const inputIds = ['mmBore', 'mmStroke', 'cCyl', 'compRatio', 'revLimit', 'ratedHP'];

    inputIds.forEach(id => {
      const rangeId = id + 'Range';
      const inputRange = document.getElementById(rangeId);
      const inputText = elements[id];

      inputRange.value = inputText.value;
    });
  }
}

presetsDropdown.addEventListener('change', handlePresetSelection);
populatePresetsDropdown();
updateSliderValues();
updateCalcs();