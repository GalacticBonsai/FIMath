import { elements } from "./elements.js";
import { calc } from "./calcs.js";

// JavaScript for calculating ECR based on fuel type
export function calculateECR() {
    const fuelType = elements.fuel.value; // Get selected fuel type from dropdown
    let maxECR = 0;
    let minECR = 0;

    // Determine the maximum ECR based on the selected fuel type
    switch (fuelType) {
        case 'gas':
            maxECR = 13;
            minECR = 6;
            break;
        case 'e85':
            maxECR = 15;
            minECR = 10;
            break;
        case 'diesel':
            maxECR = 25;
            minECR = 14;
            break;
        default:
            break;
    }

    // Display the maximum ECR for the selected fuel type
    document.getElementById('maxECR').textContent = maxECR;

    // Update the compRatio input and its range
    const compRatioInput = document.getElementById('compRatio');
    const compRatioRange = document.getElementById('compRatioRange');

    // Update minimum and maximum values for compRatio input and its range
    compRatioInput.min = minECR;
    compRatioRange.min = minECR;
    compRatioInput.max = maxECR;
    compRatioRange.max = maxECR;

    // Adjust the displayed value if it exceeds the new maximum
    const currentCompRatio = parseFloat(compRatioInput.value);
    if (currentCompRatio > maxECR) {
        compRatioInput.value = maxECR;
        compRatioRange.value = maxECR;
    }

    // Update the ECR value
    const ecrValue = Math.min(currentCompRatio, maxECR);
    document.getElementById('ecr').textContent = ecrValue.toFixed(1);
}

// Add event listener for fuel type selection
document.getElementById('fuelType').addEventListener('input', calculateECR);
document.getElementById('fuelType').addEventListener('input', calc);
