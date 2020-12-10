import { useEffect, useState } from "react";
import { getSearchSuggestions } from "../../utils/utils";
import PokemonCard from "../PokemonCard/PokemonCard";
import ToggleButton from "../ToggleButton/ToggleButton";
import "./MainPage.scss";

const MainPage = (props) => {
    const { allPokemon, pokemonHashMap } = props;
    const [pokemonToRender, setPokemonToRender] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('ALL');

    function renderAllPokemon() {
        setPokemonToRender(allPokemon);
        setSearchInput('');
        setSearchType('ALL');
    }

    function renderPokemonInBag() {
        setPokemonToRender(
            allPokemon.filter(
                function filterByPokemonInBag(pokemon) {
                    const storedPokemon = JSON.parse(localStorage.getItem(`pokemon-${pokemon.name}`));
                    return pokemon.name === storedPokemon.name && storedPokemon.inBag;
                }
            )
        );
        setSearchInput('');
        setSearchType('IN_BAG');
    }

    function searchHandler(e) {
        const value = e.target.value;
        const suggestions = getSearchSuggestions(value, pokemonHashMap);

        setSearchInput(value);

        if(suggestions.length > 0) {
            if(searchType === 'ALL') {
                setPokemonToRender(
                    allPokemon.filter(
                        function filterBySuggestions(pokemon) {
                            return suggestions.indexOf(pokemon.name) !== -1
                        }
                    )
                );
            } else {
                setPokemonToRender(
                    allPokemon
                        .filter(
                            function filterBySuggestionsAndInBag(pokemon) {
                                const storedPokemon = JSON.parse(localStorage.getItem(`pokemon-${pokemon.name}`));
                                return suggestions.indexOf(pokemon.name) !== -1 && pokemon.name === storedPokemon.name && storedPokemon.inBag;
                            }
                        )
                );
            }
        } else {
            setPokemonToRender(value.length ? [] : allPokemon);
        }
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
                <div><input type="text" placeholder="Search..." onChange={searchHandler} value={searchInput} /></div>
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