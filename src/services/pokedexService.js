const { ALL_POKEMON_LIST } = require("../api/urls")

class pokedexService {
    getAllPokemon = async () => {
        try {
            const response = await fetch(ALL_POKEMON_LIST);
            const data = await response.json()
            return data;
        } catch(error) {
            console.error("Couldn't get all pokemon", error);
            return error;
        }
    }

    getPokemon = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
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

export default pokedexService;