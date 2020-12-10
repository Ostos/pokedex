import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import DetailPage from './components/DetailPage/DetailPage';
import './App.css';
import { detailPage, mainPage } from './utils/routingPaths';
import pokedexService from './services/pokedexService';
import React, { useEffect, useState } from 'react';
import { createDictFromArrayOfWords } from './utils/utils';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemonInBag, setPokemonInBag] = useState([]);
  const [pokemonHashMap, setPokemonHashMap] = useState({});

  async function storeAllPokemon() {
    const storedPokemon = JSON.parse(localStorage.getItem('pokedex-all-pokemon'));
    if(!storedPokemon) {
      const service = new pokedexService();
      const pokemon = await service.getAllPokemon();
      localStorage.setItem('pokedex-all-pokemon', JSON.stringify(pokemon.results));
      setAllPokemon(pokemon.results);
      const names = pokemon.results.map(function getPokemonName(p) {
        return p.name
      }).sort();
      const dict = createDictFromArrayOfWords(names);
      localStorage.setItem('pokedex-hashmap', JSON.stringify(dict));
      setPokemonHashMap(dict);
    } else {
      setAllPokemon(storedPokemon);
      setPokemonHashMap(JSON.parse(localStorage.getItem('pokedex-hashmap')));
    }
    const pokemonInBag = JSON.parse(localStorage.getItem('pokedex-pokemon-in-bag'));
    if(!pokemonInBag) {
      localStorage.setItem('pokedex-pokemon-in-bag', JSON.stringify([]));
    } else {
      setPokemonInBag(pokemonInBag);
    }
  }

  useEffect(() => {
    storeAllPokemon();
   }, []);

  return (
    <div className="Pokedex">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/pokemons/:name"
            render={() => <DetailPage setPokemonInBag={setPokemonInBag} />}
          />
          <Route
            path="*"
            render={() => <MainPage allPokemon={allPokemon} pokemonInBag={pokemonInBag} pokemonHashMap={pokemonHashMap} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
