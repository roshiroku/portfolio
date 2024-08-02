import { defaultSettings, settings, SettingsKey, SettingsValue } from "./config.js";
import { setupGame } from "./game.js";

const enableWalls = document.getElementById("enable-walls") as HTMLInputElement;
const initialSpeed = document.getElementById("initial-speed") as HTMLInputElement;
const pizzaCount = document.getElementById("pizza-count") as HTMLInputElement;
const enableMice = document.getElementById("enable-mice") as HTMLInputElement;
const initialSpeedValue = document.getElementById("initial-speed-value")!;
const pizzaCountValue = document.getElementById("pizza-count-value")!;
const main = document.querySelector("main")!;
const lightbox = document.querySelector(".lightbox")!;
const aside = document.querySelector(".settings-section")!;
const menuBtn = document.getElementById("menu-btn")!;
const saveBtn = document.getElementById("save-btn")!;
const defaultBtn = document.getElementById("default-btn")!;

enableWalls.addEventListener("input", () => updateSetting("enableWalls", enableWalls.checked));
enableMice.addEventListener("input", () => updateSetting("enableMice", enableMice.checked));
initialSpeed.addEventListener("input", () => updateSetting("initialSpeed", Number(initialSpeed.value), updateSpeedDisplay));
pizzaCount.addEventListener("input", () => updateSetting("pizzaCount", Number(pizzaCount.value), updatePizzaCountDisplay));

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
    pizzaCount: Number(pizzaCount.value),
    enableMice: enableMice.checked,
  };
  localStorage.setItem("snakeSettings", JSON.stringify(newSettings));
  closeSettings();
  setupGame();
}

function resetToDefault() {
  localStorage.removeItem("snakeSettings");
  Object.assign(settings, defaultSettings);
  updateUI(defaultSettings);
  closeSettings();
  setupGame();
}

function updateUI(data = settings) {
  enableWalls.checked = data.enableWalls;
  initialSpeed.value = `${data.initialSpeed}`;
  pizzaCount.value = `${data.pizzaCount}`;
  enableMice.checked = data.enableMice;
  updateSpeedDisplay();
  updatePizzaCountDisplay();
}

function updateSpeedDisplay() {
  initialSpeedValue.innerText = initialSpeed.value;
}

function updatePizzaCountDisplay() {
  pizzaCountValue.innerText = pizzaCount.value;
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