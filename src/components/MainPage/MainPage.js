import PokemonCard from "../PokemonCard/PokemonCard";
import ToggleButton from "../ToggleButton/ToggleButton";
import "./MainPage.scss";

const MainPage = (props) => {
    const { allPokemon } = props;

    return(
        <div className="MainPage">
            <div className="MainPage__filters">
                <ToggleButton
                    name1="All"
                    name2="Bag"
                    handler1={() => {
                        console.log("Show all pokemon");
                    }}
                    handler2={() => {
                        console.log("Show pokemon in the bag");
                    }}
                />
                <div><input type="text" placeholder="Search..." /></div>
            </div>
            <div className="MainPage__cards">
                {allPokemon.map(pokemon => {
                    return <PokemonCard key={pokemon.name} pokemon={pokemon} />
                })}
            </div>
        </div>
    );
};

export default MainPage;