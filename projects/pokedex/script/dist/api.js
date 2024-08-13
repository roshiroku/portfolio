const BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_URL = `${BASE_URL}/pokemon`;
const POKEDEX_LIST_KEY = "pokedex-list-all";
export async function getList() {
    let all = JSON.parse(localStorage.getItem(POKEDEX_LIST_KEY) || "[]");
    if (!all.length) {
        const countReq = await fetch(POKEMON_URL);
        const { count } = await countReq.json();
        const req = await fetch(`${POKEMON_URL}/?limit=${count}`);
        const res = await req.json();
        localStorage.setItem(POKEDEX_LIST_KEY, JSON.stringify(all = res.results));
    }
    return all;
}
export async function getPokemon(name) {
    const all = await getList();
    const entry = all.find(pokemon => pokemon.name == name);
    if (entry) {
        let pokemon = JSON.parse(localStorage.getItem(`pokedex-${name}`) || "{}");
        if (!Object.keys(pokemon).length) {
            const req = await fetch(entry.url);
            pokemon = await req.json();
            try {
                localStorage.setItem(`pokedex-${name}`, JSON.stringify(reducePokemon(pokemon)));
            }
            catch (e) {
                console.log(e.message);
            }
        }
        return pokemon;
    }
}
function reducePokemon(apiPokemon) {
    return {
        id: apiPokemon.id,
        name: apiPokemon.name,
        height: apiPokemon.height,
        weight: apiPokemon.weight,
        species: apiPokemon.species,
        sprites: { ...apiPokemon.sprites, other: undefined, versions: undefined },
        stats: apiPokemon.stats,
        types: apiPokemon.types,
    };
}
