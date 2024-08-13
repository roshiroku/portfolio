import { getList, getPokemon } from "./api.js";
import { createElement, unslugify } from "./utils.js";

const menuButton = document.getElementById("menu-button") as HTMLButtonElement;
const aside = document.getElementsByTagName("aside")[0];
const searchInput = document.getElementById("pokedex-filter") as HTMLInputElement;
const searchCount = document.getElementById("pokedex-count")!;
const listEl = document.getElementById("pokedex-list")!;
const main = document.getElementsByTagName("main")[0];
const contentEl = document.getElementById("pokedex-main")!;
const loadingEl = document.getElementById("pokedex-loading")!;
const listItems: HTMLElement[] = [];

menuButton.addEventListener("click", () => toggleDrawer(!aside.classList.contains("open")));
main.addEventListener("click", () => isMobile() && toggleDrawer(false));

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  listItems.forEach(li => {
    const name = li.getAttribute("data-name")!.toLowerCase().replace(/-/g, " ");
    li.hidden = !!value && !name.includes(value);
  });

  updateCount();
});

loadList().then(pokemon => {
  updateCount();
  loadPokemon(pokemon[0].name);
});

async function loadList() {
  toggleLoading(true);

  const all = await getList();

  all.forEach(entry => {
    const btn = createElement("button", [unslugify(entry.name)]);
    const li = createElement("li", [btn]);

    li.setAttribute("data-name", entry.name);
    btn.addEventListener("click", () => loadPokemon(entry.name).then(() => isMobile() && toggleDrawer(false)));
    listEl.append(li);
    listItems.push(li);
  });

  toggleLoading(false);

  return all;
}

async function loadPokemon(name: string) {
  toggleLoading(true);

  const pokemon = await getPokemon(name);

  if (pokemon) {
    contentEl.innerHTML = /* html */`
      <div class="col">
        <h2>${unslugify(pokemon.name)}</h2>
        <div class="row">
          <b>Type:</b>
          ${pokemon.types.map(({ type }) => /* html */`
            <span class="pill">${unslugify(type.name)}</span>
          `).join("")}
        </div>
        <div class="row">
          <div>
            <b>Species:</b>
            <span>${unslugify(pokemon.species.name)}</span>
          </div>
          <div>
            <b>Height:</b>
            <span>${pokemon.height / 10}m</span>
          </div>
          <div>
            <b>Weight:</b>
            <span>${pokemon.weight / 10}kg</span>
          </div>
        </div>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      </div>
      <div class="col">
        <div class="col compact">
          <h3>Stats</h3>
          ${pokemon.stats.map(({ base_stat, stat }) => /* html */`
            <div>
              <b>${stat.name == "hp" ? "HP" : unslugify(stat.name)}:</b>
              <span>${base_stat}</span>
            </div>
          `).join("")}
        </div>
      </div>`;
  }

  toggleLoading(false);

  return pokemon;
}

function updateCount() {
  const count = listItems.reduce((count, li) => count + Number(!li.hidden), 0);
  searchCount.textContent = `${count} Result${count == 1 ? "" : "s"}`;
}

function isMobile() {
  return window.innerWidth <= 640;
}

function toggleLoading(loading: boolean) {
  loadingEl.classList.toggle("active", loading);
}

function toggleDrawer(open: boolean) {
  aside.classList.toggle("open", open);
}