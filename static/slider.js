export function updateSliderValues(inputIds, fn) {
  
    inputIds.forEach(id => {
      const rangeId = id + 'Range';
      const inputRange = document.getElementById(rangeId);
      const inputText = document.getElementById(id);
  
      if (inputRange && inputText) {
        const updatesliderValues = () => {
          inputText.value = inputRange.value;
          fn();
        };
        inputRange.addEventListener('input', updatesliderValues);
        
        const updateTextValues = () => {
          inputRange.value= inputText.value;
          fn();
        };
        inputText.addEventListener('input', updateTextValues);
      }
    });
  }