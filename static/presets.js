const presetsDropdown = document.getElementById('presets');

const presets = {
  Nissan_370z: {
    mmBore: 95.5,
    mmStroke: 86,
    cCyl: 6,
    revLimit: 7500,
    compRatio: 11,
    ve: 109
  },
  Mitsubishi_EvoX: {
    mmBore: 86,
    mmStroke: 86,
    cCyl: 4,
    revLimit: 7600,
    compRatio: 9,
    ve: 100
  },
  Grom_2023: {
    mmBore: 50,
    mmStroke: 63.1,
    cCyl: 1,
    revLimit: 7000,
    compRatio: 10,
    ve: 110
  },
  Audi_R8_52: {
    mmBore: 84.5,
    mmStroke: 92.8,
    cCyl: 10,
    revLimit: 8100,
    compRatio: 12.7,
    ve: 105
  }
};

export function populatePresetsDropdown() {
  for (const preset in presets) {
    if (presets.hasOwnProperty(preset)) {
      const option = document.createElement('option');
      option.value = preset;
      option.textContent = preset.charAt(0).toUpperCase() + preset.slice(1); // Capitalize first letter
      presetsDropdown.appendChild(option);
    }
  }
}

export function handlePresetSelection() {
  const selectedPreset = presets[presetsDropdown.value];
  if (selectedPreset) {
    documents.getElementById(mmBore).value = selectedPreset.mmBore;
    documents.getElementById(mmStroke).value = selectedPreset.mmStroke;
    documents.getElementById(cCyl).value = selectedPreset.cCyl;
    documents.getElementById(revLimit).value = selectedPreset.revLimit;
    documents.getElementById(compRatio).value = selectedPreset.compRatio;
    documents.getElementById(ve).value = selectedPreset.ve;

    const inputIds = ['mmBore', 'mmStroke', 'cCyl', 'compRatio', 'revLimit', 've'];

    inputIds.forEach(id => {
      const rangeId = id + 'Range';
      const inputRange = document.getElementById(rangeId);
      const inputText = document.getElementById(id);

      inputRange.value = inputText.value;
    });
  }
}

presetsDropdown.addEventListener('change', handlePresetSelection);