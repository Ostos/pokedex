const { ALL_POKEMON_LIST } = require("../api/urls")

class pokedexService {
    getAllPokemon = async() => {
        try {
            const response = await fetch(ALL_POKEMON_LIST);
            const data = await response.json()
            return data;
        } catch(error) {
            console.error("Couldn't get all pokemon", error);
            return error;
        }
    }
}

export default pokedexService;