const PokemonCard = (props) => {
    const { name, url } = props.pokemon;

    return(
        <div className="PokemonCard">
            <div>{name}</div>
            <div>{url}</div>
        </div>
    );
};

export default PokemonCard;