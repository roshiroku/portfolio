const BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_URL = `${BASE_URL}/pokemon`;
const POKEDEX_LIST_KEY = "pokedex-list-all";

type NamedAPIResource = {
  name: string;
  url: string;
};

type Sprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

type Type = {
  slot: number;
  type: NamedAPIResource;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: NamedAPIResource;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
};

export type PokedexList = { name: string; url: string; }[];

export async function getList() {
  let all = JSON.parse(localStorage.getItem(POKEDEX_LIST_KEY) || "[]");

  if (!all.length) {
    const countReq = await fetch(POKEMON_URL);
    const { count } = await countReq.json();
    const req = await fetch(`${POKEMON_URL}/?limit=${count}`);
    const res = await req.json();
    localStorage.setItem(POKEDEX_LIST_KEY, JSON.stringify(all = res.results));
  }

  return all as PokedexList;
}

export async function getPokemon(name: string) {
  const all = await getList();
  const entry = all.find(pokemon => pokemon.name == name);

  if (entry) {
    let pokemon = JSON.parse(localStorage.getItem(`pokedex-${name}`) || "{}");

    if (!Object.keys(pokemon).length) {
      const req = await fetch(entry.url);
      pokemon = await req.json();

      try {
        localStorage.setItem(`pokedex-${name}`, JSON.stringify(reducePokemon(pokemon)));
      } catch (e: any) {
        console.log(e.message);
      }
    }

    return pokemon as Pokemon;
  }
}

function reducePokemon(apiPokemon: Pokemon): Pokemon {
  return {
    id: apiPokemon.id,
    name: apiPokemon.name,
    height: apiPokemon.height,
    weight: apiPokemon.weight,
    species: apiPokemon.species,
    sprites: { ...apiPokemon.sprites, other: undefined, versions: undefined } as any,
    stats: apiPokemon.stats,
    types: apiPokemon.types,
  };
}