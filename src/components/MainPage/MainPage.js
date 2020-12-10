import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import ToggleButton from "../ToggleButton/ToggleButton";
import "./MainPage.scss";

const MainPage = (props) => {
    const { allPokemon, pokemonInBag } = props;
    const [pokemonToRender, setPokemonToRender] = useState([]);

    console.log(pokemonToRender);

    function renderAllPokemon() {
        setPokemonToRender(allPokemon);
    }

    function renderPokemonInBag() {
        setPokemonToRender(
            allPokemon.filter(
                function filterByPokemonInBag(pokemon) {
                    return pokemonInBag.indexOf(pokemon.name) !== -1
                }
            )
        );
    }

    useEffect(() => {
        setPokemonToRender(allPokemon);
    }, [allPokemon]);

    return(
        <div className="MainPage">
            <div className="MainPage__filters">
                <ToggleButton
                    name1="All"
                    name2="Bag"
                    handler1={renderAllPokemon}
                    handler2={renderPokemonInBag}
                />
                <div><input type="text" placeholder="Search..." /></div>
            </div>
            <div className="MainPage__cards">
                {pokemonToRender.map(pokemon => {
                    return <PokemonCard key={pokemon.name} pokemon={pokemon} />
                })}
            </div>
        </div>
    );
};

export default MainPage;