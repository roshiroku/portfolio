import CountryManager from "./manager.js";

const manager = new CountryManager();
const searchInput = document.getElementById("search-input");
const resultsEl = document.getElementById("results-panel");
const countryPanelEl = document.getElementById("country-panel");
const countryPanelCloseBtn = document.getElementById("country-panel-close");
const countryInfoEl = document.getElementById("country-info");

searchInput.addEventListener("input", () => {
  manager.filter = searchInput.value.replace(/\s+/g, " ").trim().toLowerCase();
  manager.updateTable();
  closeCountryPanel();
});
countryPanelCloseBtn.addEventListener("click", closeCountryPanel);

onLoad();

async function onLoad() {
  await manager.load();
  const table = manager.createTable(onTableRowClick);
  resultsEl.append(table);
}

function onTableRowClick(country) {
  countryPanelEl.classList.add("open");
  countryInfoEl.innerHTML = country.getHTML();
}

function closeCountryPanel() {
  countryPanelEl.classList.remove("open");
}