import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pokedexService from "../../services/pokedexService";
import "./PokemonCard.scss";

const PokemonCard = (props) => {
    const { name, url } = props.pokemon;
    const [imageSrc, setImageSrc] = useState("");

    async function getPokemon() {
        // check if pokemon info already exists in storage
        let pokemonInfo = JSON.parse(localStorage.getItem(`pokemon-${name}`));

        if(!pokemonInfo) {
            // request pokemon info from api
            const service = new pokedexService();
            const pokemon = await service.getPokemon(url);

            // store pokemon info in storage
            const pokemonDataToStore = {
                abilities: pokemon.abilities.map(ability => ability.ability.name).join(" "),
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types.map(type => type.type.name).join(" "),
                imageUrl: pokemon.sprites.front_default,
                inBag: false,
                name: name
            };
            localStorage.setItem(`pokemon-${name}`, JSON.stringify(pokemonDataToStore));

            // set state for imageUrl
            setImageSrc(pokemonDataToStore.imageUrl);
        } else {
            // set state for imageUrl
            setImageSrc(pokemonInfo.imageUrl);
        }
    }

    useEffect(() => {
        getPokemon();
    }, []);

    return(
        <Link
            to={`/pokemons/${name}`}
            className="PokemonCard"
        >
            <img src={imageSrc} className="PokemonCard__image" />
            <div>{name}</div>
        </Link>
    );
};

export default PokemonCard;