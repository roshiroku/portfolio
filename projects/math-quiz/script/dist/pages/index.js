import { saveSettings, settings } from "../config.js";
const settingsForm = document.getElementById("quiz-settings");
const minValueInput = document.getElementById("min-value");
const maxValueInput = document.getElementById("max-value");
const numTermsInput = document.getElementById("num-terms");
const operationCheckboxes = document.querySelectorAll('input[name="operations"]');
const startQuizBtn = document.getElementById("start-quiz");
settingsForm.addEventListener("input", () => validateInputs() && saveInputs());
loadInputs();
startQuizBtn.addEventListener("click", function () {
    if (validateInputs()) {
        window.location.href = "./quiz.html";
    }
});
function validateInputs() {
    let isValid = minValueInput.reportValidity() &&
        maxValueInput.reportValidity() &&
        numTermsInput.reportValidity();
    if ([...operationCheckboxes].some(checkbox => checkbox.checked)) {
        operationCheckboxes.forEach(checkbox => checkbox.setCustomValidity(""));
    }
    else {
        operationCheckboxes.forEach(checkbox => {
            checkbox.setCustomValidity("At least one operation must be selected.");
            checkbox.reportValidity();
        });
        isValid = false;
    }
    return isValid;
}
function saveInputs() {
    const minValue = Number(minValueInput.value);
    const maxValue = Number(maxValueInput.value);
    const numTerms = Number(numTermsInput.value);
    const operations = [...operationCheckboxes].filter(el => el.checked).map(el => el.value);
    saveSettings({ minValue, maxValue, numTerms, operations });
}
function loadInputs() {
    minValueInput.value = `${settings.minValue}`;
    maxValueInput.value = `${settings.maxValue}`;
    numTermsInput.value = `${settings.numTerms}`;
    operationCheckboxes.forEach(checkbox => checkbox.checked = settings.operations.includes(checkbox.value));
}
