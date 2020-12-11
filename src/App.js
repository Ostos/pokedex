import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import DetailPage from './components/DetailPage/DetailPage';
import './App.css';
import { ANY_PAGE, DETAIL_PAGE } from './utils/routingPaths';
import pokedexService from './services/pokedexService';
import React, { useEffect, useState } from 'react';
import { createDictFromArrayOfWords } from './utils/utils';
import localStore from './utils/store';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemonHashMap, setPokemonHashMap] = useState({});

  async function storeAllPokemon() {
    // check if pokemon are already stored
    const storedPokemon = localStore.get('pokedex-all-pokemon');

    if(!storedPokemon) {
      // request data from api
      const service = new pokedexService();
      const pokemon = await service.getAllPokemon();

      // store pokemon data in local storage
      localStore.set('pokedex-all-pokemon', pokemon.results);
      setAllPokemon(pokemon.results);

      // get sorted list of pokemon names
      const names = pokemon.results.map(function getPokemonName(p) {
        return p.name
      }).sort();

      // create and store hashmap with pokemon names
      const dict = createDictFromArrayOfWords(names);
      localStore.set('pokedex-hashmap', dict);
      setPokemonHashMap(dict);
    } else {
      // set state from stored data
      setAllPokemon(storedPokemon);
      setPokemonHashMap(localStore.get('pokedex-hashmap'));
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
            path={DETAIL_PAGE}
            render={() => <DetailPage />}
          />
          <Route
            path={ANY_PAGE}
            render={() => <MainPage allPokemon={allPokemon} pokemonHashMap={pokemonHashMap} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
