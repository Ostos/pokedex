import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import DetailPage from './components/DetailPage/DetailPage';
import './App.css';
import { detailPage, mainPage } from './utils/routingPaths';
import pokedexService from './services/pokedexService';
import React, { useEffect, useState } from 'react';

function App() {

  const [allPokemon, setAllPokemon] = useState([]);

  async function storeAllPokemon() {
    const storedPokemon = localStorage.getItem('pokedex-all-pokemon');
    if(!storedPokemon) {
      const service = new pokedexService();
      const pokemon = await service.getAllPokemon();
      localStorage.setItem('pokedex-all-pokemon', JSON.stringify(pokemon.results));
      setAllPokemon(pokemon);
    } else {
      setAllPokemon(JSON.parse(storedPokemon));
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
            path={detailPage}
            render={() => <DetailPage />}
          />
          <Route
            path="*"
            render={() => <MainPage allPokemon={allPokemon}/>}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
