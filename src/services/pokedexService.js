import localStore from "../utils/store";
import { createDictFromArrayOfWords } from "../utils/utils";
const { ALL_POKEMON_LIST } = require("../api/urls")

class PokedexService {
    getAllPokemon = async () => {
        try {
            const storedPokemon = localStore.get('pokedex-all-pokemon');
            const storedPokedexHashmap = localStore.get('pokedex-hashmap');
            if(storedPokemon && storedPokedexHashmap) {
                return {
                    pokemon: storedPokemon,
                    pokedexHashmap: storedPokedexHashmap
                };
            }

            const response = await fetch(ALL_POKEMON_LIST);
            const data = await response.json();
            const pokemon = data.results;
            localStore.set('pokedex-all-pokemon', pokemon);

            // get sorted list of pokemon names
            const names = pokemon.map(function getPokemonName(p) {
                return p.name;
            }).sort();
        
            // create and store hashmap with pokemon names
            const pokedexHashmap = createDictFromArrayOfWords(names);
            localStore.set('pokedex-hashmap', pokedexHashmap);

            return { pokemon, pokedexHashmap };
        } catch(error) {
            console.error("Couldn't get all pokemon", error);
            return error;
        }
    }

    getPokemon = async ({ name, url }) => {
        try {
            const storedPokemonInfo = localStore.get(`pokemon-${name}`);
            if(storedPokemonInfo) {
                return storedPokemonInfo;
            }

            const response = await fetch(url);
            const pokemon = await response.json();

            const pokemonDataToStore = {
                abilities: pokemon.abilities.map(ability => ability.ability.name).join(" "),
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types.map(type => type.type.name).join(" "),
                imageUrl: pokemon.sprites.front_default,
                inBag: false,
                name: name,
                id: pokemon.id
            };
            localStore.set(`pokemon-${name}`, pokemonDataToStore);

            return pokemonDataToStore;
        } catch(error) {
            console.error("Couldn't get individual pokemon", error);
            return error;
        }
    }

    getPokemonLocations = async (id) => {
        try {
            const response = await fetch(`https://api.craft-demo.net/pokemon/${id}`,
                { headers:
                    { 'x-api-key': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l'
                }
            });
            const data = await response.json();
            return data.locations;
        } catch(error) {
            console.error("Couldn't get pokemon locations", error);
            return error;
        }
    }
}

export default PokedexService;