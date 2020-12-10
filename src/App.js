import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import DetailPage from './components/DetailPage/DetailPage';
import './App.css';
import { detailPage, mainPage } from './utils/routingPaths';
import pokedexService from './services/pokedexService';
import React, { useEffect, useState } from 'react';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemonInBag, setPokemonInBag] = useState([]);

  async function storeAllPokemon() {
    const storedPokemon = JSON.parse(localStorage.getItem('pokedex-all-pokemon'));
    if(!storedPokemon) {
      const service = new pokedexService();
      const pokemon = await service.getAllPokemon();
      localStorage.setItem('pokedex-all-pokemon', JSON.stringify(pokemon.results));
      setAllPokemon(pokemon.results);
    } else {
      setAllPokemon(storedPokemon);
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
            render={() => <MainPage allPokemon={allPokemon} pokemonInBag={pokemonInBag} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
