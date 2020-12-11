import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import DetailPage from './components/DetailPage/DetailPage';
import PokedexService from './services/PokedexService';
import React, { useEffect, useState } from 'react';
import { ANY_PAGE, DETAIL_PAGE } from './utils/routingPaths';
import './App.css';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemonHashMap, setPokemonHashMap] = useState({});

  async function initPokemon() {
    const service = new PokedexService();
    const { pokemon , pokedexHashmap } = await service.getAllPokemon();
    setAllPokemon(pokemon);
    setPokemonHashMap(pokedexHashmap);
  }

  useEffect(() => {
    initPokemon();
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
