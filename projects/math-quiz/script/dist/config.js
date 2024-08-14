const defaultSettings = {
    minValue: 1,
    maxValue: 10,
    numTerms: 2,
    operations: ["+", "-"]
};
const settings = JSON.parse(localStorage.getItem("math-quiz-settings") || JSON.stringify(defaultSettings));
function saveSettings(settings) {
    localStorage.setItem("math-quiz-settings", JSON.stringify(settings));
}
export { defaultSettings, settings, saveSettings };
