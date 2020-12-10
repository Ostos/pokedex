import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import DetailPage from './components/DetailPage';
import './App.css';
import { detailPage, mainPage } from './utils/routingPaths';

function App() {
  return (
    <div className="Pokedex">
      <BrowserRouter>
        <Switch>
          <Route
            path={mainPage}
            render={() => <MainPage />}
          />
          <Route
            path={detailPage}
            render={() => <DetailPage />}
          />
          <Route
            path="*"
            render={() => <MainPage />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
