import { Operation } from "./math.js";

const defaultSettings = {
  minValue: 1,
  maxValue: 10,
  numTerms: 2,
  operations: ["+", "-"] as Operation[]
};

const settings: typeof defaultSettings = JSON.parse(localStorage.getItem("mathQuizSettings") || JSON.stringify(defaultSettings));

type Settings = typeof settings;
type SettingsKey = keyof Settings;

function saveSettings(settings: Settings) {
  localStorage.setItem("mathQuizSettings", JSON.stringify(settings));
}

export { defaultSettings, settings, Settings, SettingsKey, saveSettings };