import { defaultSettings, settings, SettingsKey, SettingsValue } from "./config.js";
import { setupGame } from "./game.js";

const enableWalls = document.getElementById("enable-walls") as HTMLInputElement;
const initialSpeed = document.getElementById("initial-speed") as HTMLInputElement;
const appleCount = document.getElementById("apple-count") as HTMLInputElement;
const enableMice = document.getElementById("enable-mice") as HTMLInputElement;
const initialSpeedValue = document.getElementById("initial-speed-value")!;
const appleCountValue = document.getElementById("apple-count-value")!;
const main = document.querySelector("main")!;
const lightbox = document.querySelector(".lightbox")!;
const aside = document.querySelector(".settings-section")!;
const menuBtn = document.getElementById("menu-btn")!;
const saveBtn = document.getElementById("save-btn")!;
const defaultBtn = document.getElementById("default-btn")!;

enableWalls.addEventListener("input", () => updateSetting("enableWalls", enableWalls.checked));
enableMice.addEventListener("input", () => updateSetting("enableMice", enableMice.checked));
initialSpeed.addEventListener("input", () => updateSetting("initialSpeed", Number(initialSpeed.value), updateSpeedDisplay));
appleCount.addEventListener("input", () => updateSetting("appleCount", Number(appleCount.value), updateAppleCountDisplay));

saveBtn.addEventListener("click", saveSettings);
defaultBtn.addEventListener("click", resetToDefault);
menuBtn.addEventListener("click", toggleSettings);
lightbox.addEventListener("click", closeSettings);

updateUI();

function updateSetting<K extends SettingsKey>(key: K, value: SettingsValue<K>, callback?: () => void) {
  settings[key] = value;
  if (callback) callback();
}

function saveSettings() {
  const newSettings = {
    enableWalls: enableWalls.checked,
    initialSpeed: Number(initialSpeed.value),
    appleCount: Number(appleCount.value),
    enableMice: enableMice.checked,
  };
  localStorage.setItem("snake-settings", JSON.stringify(newSettings));
  closeSettings();
  setupGame();
}

function resetToDefault() {
  localStorage.removeItem("snake-settings");
  Object.assign(settings, defaultSettings);
  updateUI(defaultSettings);
  closeSettings();
  setupGame();
}

function updateUI(data = settings) {
  enableWalls.checked = data.enableWalls;
  initialSpeed.value = `${data.initialSpeed}`;
  appleCount.value = `${data.appleCount}`;
  enableMice.checked = data.enableMice;
  updateSpeedDisplay();
  updateAppleCountDisplay();
}

function updateSpeedDisplay() {
  initialSpeedValue.innerText = initialSpeed.value;
}

function updateAppleCountDisplay() {
  appleCountValue.innerText = appleCount.value;
}

function toggleSettings() {
  aside.classList.toggle("open");
  main.classList.toggle("shifted");
  lightbox.classList.toggle("active");
  menuBtn.children[0].classList.toggle("hidden");
  menuBtn.children[1].classList.toggle("hidden");
}

function closeSettings() {
  aside.classList.remove("open");
  main.classList.remove("shifted");
  lightbox.classList.remove("active");
  menuBtn.children[0].classList.remove("hidden");
  menuBtn.children[1].classList.add("hidden");
}