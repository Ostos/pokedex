import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import DetailPage from './components/DetailPage/DetailPage';
import './App.css';
import { detailPage, mainPage } from './utils/routingPaths';
// import pokedexService from './services/pokedexService';
import React, { useEffect, useState } from 'react';

function App() {

  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    // const service = new pokedexService();
    // const pokemon = service.getAllPokemon();
    const pokemon = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
      { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
      { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" }
    ];
    console.log(pokemon);
    setAllPokemon(pokemon);
   }, []);

  return (
    <div className="Pokedex">
      <BrowserRouter>
        <Switch>
          <Route
            path={mainPage}
            render={() => <MainPage allPokemon={allPokemon} />}
          />
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
