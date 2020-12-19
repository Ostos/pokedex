import { Fragment, useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import PokedexService from "../../services/pokedexService";
import { useParams } from "react-router-dom";
import localStore from '../../utils/store';
import "./DetailPage.scss";

const MapsMarker = (props) => {
    return(
        <img
            src={props.image}
            alt="pokemon location marker"
        />
    );
};

const DetailPage = () => {
    const [pokemon, setPokemon] = useState({});
    const [isInBag, setIsInBag] = useState(false);
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const API_KEY = 'AIzaSyCcpUwGDDw_x4yR4Ng-fbS5CfcJGr5CG6A';
    const { name } = useParams();

    function setInBag(e) {
        const store = e.target.checked;
        setIsInBag(store);
        const pokemon = localStore.get(`pokemon-${name}`);
        localStore.set(`pokemon-${name}`, { ...pokemon, inBag : store });
    }

    async function loadPokemonLocations(id) {
        setIsLoading(true);
        const service = new PokedexService();
        const locationResponse = await service.getPokemonLocations(id);
        const locations = locationResponse.map(pair => {
            const [lat, lng] = pair.split(',');
            return { lat: parseFloat(lat), lng: parseFloat(lng) };
        });
        setLocations(locations);
        setIsLoading(false);
    }

    useEffect(() => {
        async function getPokemon() {
            const service = new PokedexService();
            const pokemon = await service.getPokemon({
                name: name, 
                url: `https://pokeapi.co/api/v2/pokemon/${name}`
            });
            if(pokemon instanceof Error) {
                setPokemon(null);
            } else {
                setPokemon(pokemon);
                setIsInBag(pokemon.inBag);
                loadPokemonLocations(pokemon.id);
            }
        }

        getPokemon();
    }, [name]);

    return(
        <div className="DetailPage">
            {pokemon === null && (
                <div className="DetailPage__error-message">
                    Oops! That pokemon doesn't exist!
                </div>
            )}
            {pokemon !== null && (
                <Fragment>
                    <div className="DetailPage__info">
                        <div className="DetailPage__info__profile-picture">
                            <img
                                src={pokemon.imageUrl}
                                alt={name}
                            />
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
                        <div className="DetailPage__location__map">
                            {!isLoading && (
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: API_KEY }}
                                    defaultCenter={locations[0] || { lat: 32.715736, lng: -117.161087 }}
                                    defaultZoom={7}
                                >
                                    {locations.length > 0 && locations.map((location, index) => {
                                        return (
                                            <MapsMarker
                                                key={index}
                                                image={pokemon.imageUrl}
                                                {...location}
                                            />
                                        )
                                    })}
                                </GoogleMapReact>
                            )}
                            {isLoading && (
                                <div className="DetailPage__location__map__loading">Loading...</div>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default DetailPage;