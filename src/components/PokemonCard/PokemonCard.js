import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pokedexService from "../../services/pokedexService";
import "./PokemonCard.scss";

const PokemonCard = (props) => {
    const { name, url } = props.pokemon;
    const [imageSrc, setImageSrc] = useState("");

    async function getPokemon() {
        // let individualPokemonList = JSON.parse(localStorage.getItem('pokedex-individual-pokemon-list'));
        // individualPokemonList = !individualPokemonList ? {} : individualPokemonList

        // if(!individualPokemonList[name]) {
        //     const service = new pokedexService();
        //     const pokemon = await service.getPokemon(url);
        //     individualPokemonList = JSON.parse(localStorage.getItem('pokedex-individual-pokemon-list'));
        //     setImageSrc(pokemon.sprites.front_default);
        //     console.log({ ...individualPokemonList, [name]: pokemon });
        //     localStorage.setItem('pokedex-individual-pokemon-list', JSON.stringify({ ...individualPokemonList, [name]: pokemon }));
        // } else {
        //     setImageSrc(individualPokemonList.sprites.front_default);
        // }


    }

    useEffect(() => {
        getPokemon();
    }, []);

    return(
        <Link
            to="/pokemons/1"
            className="PokemonCard"
        >
            <img src={imageSrc} className="PokemonCard__image" />
            <div>{name}</div>
        </Link>
    );
};

export default PokemonCard;