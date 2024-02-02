import { elements } from "./elements.js";
import { calc } from "./calcs.js";

export function updateSliderValues() {
  const inputIds = ['mmBore', 'mmStroke', 'cCyl', 'compRatio', 'revLimit', 've', 'boostPsi'];

  inputIds.forEach(id => {
    const rangeId = id + 'Range';
    const inputRange = document.getElementById(rangeId);
    const inputText = elements[id];

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
