import { useEffect, useState } from "react";
import "./DetailPage.scss";

const DetailPage = (props) => {
    const { setPokemonInBag } = props;
    const [pokemon, setPokemon] = useState({});
    const [isInBag, setIsInBag] = useState(false);
    const name = window.location.pathname.split('/')[2];

    function setInBag(e) {
        const store = e.target.checked;
        setIsInBag(store);
        const bagStore = JSON.parse(localStorage.getItem('pokedex-pokemon-in-bag'));
        if(store) {
            localStorage.setItem('pokedex-pokemon-in-bag', JSON.stringify([...bagStore, name]));
            setPokemonInBag([...bagStore, name]);
        } else {
            localStorage.setItem('pokedex-pokemon-in-bag', JSON.stringify([...bagStore].filter(pokemon => pokemon !== name)));
            setPokemonInBag([...bagStore].filter(pokemon => pokemon !== name));
        }
    }

    useEffect(() => {
        const pokemon = JSON.parse(localStorage.getItem(`pokemon-${name}`));
        setPokemon(pokemon);
        const inBag = JSON.parse(localStorage.getItem('pokedex-pokemon-in-bag'));
        setIsInBag(inBag.indexOf(name) !== -1);
    }, []);

    return(
        <div className="DetailPage">
            <div className="DetailPage__info">
                <div className="DetailPage__info__profile-picture">
                    <img src={pokemon.imageUrl} />
                    <span>{pokemon.name}</span>
                </div>
                <div className="DetailPage__info__in-bag">
                    <b>In Bag</b> <input type="checkbox" onChange={setInBag} value={isInBag} checked={isInBag} />
                </div>
                <div className="DetailPage__info__description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida augue turpis, vel molestie magna lobortis ac. Aliquam erat volutpat. Phasellus turpis quam, fermentum nec lacus feugiat, accumsan fringilla odio. Pellentesque at laoreet lectus. Pellentesque molestie elit eget massa tempor, ac ornare felis posuere. Cras ac elementum lacus, at pharetra purus. Integer a maximus arcu, quis euismod massa. Aliquam in commodo ligula, eu sagittis lacus. Donec pretium magna at tortor luctus posuere. In hac habitasse platea dictumst. Sed nec dictum purus, vitae tristique orci. Nunc sed arcu non nisl ornare consectetur eget consequat enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin imperdiet imperdiet lacus, eu vestibulum elit accumsan eget.
                </div>
                <div className="DetailPage__info__height">
                    <b>Height:</b> {pokemon.height}
                </div>
                <div className="DetailPage__info__weight">
                    <b>Weight:</b> {pokemon.weight}
                </div>
                <div className="DetailPage__info__types">
                    <b>Types:</b> {pokemon.types}
                </div>
                <div className="DetailPage__info__abilities">
                    <b>Abilities:</b> {pokemon.abilities}
                </div>
            </div>
            <div className="DetailPage__location">
                <div className="DetailPage__location__map"></div>
            </div>
        </div>
    );
};

export default DetailPage;