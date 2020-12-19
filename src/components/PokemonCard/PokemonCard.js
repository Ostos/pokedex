import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokedexService from "../../services/pokedexService";
import "./PokemonCard.scss";

const PokemonCard = (props) => {
    const { name } = props.pokemon;
    const [imageSrc, setImageSrc] = useState("");

    async function getPokemon() {
        const service = new PokedexService();
        const pokemon = await service.getPokemon(props.pokemon);
        setImageSrc(pokemon.imageUrl);
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