
function DisplayWinner(props) {
    const pokemon=props.winnerPokemon;
    const handler=props.handler;
    console.log(pokemon);
    return (
        <>
        <div className="victory-bg">
            <h1 className="winner">Winner</h1>
            <img src={pokemon.sprites.other.showdown.front_default} className="pokemon-pic" width='300px' height='300px' alt="winner pokemon"/>
        </div>
        <br></br>
        <div className="back-to-location">
        
        <button className="customButton" onClick={handler}>Go back to Locations</button>

        </div>
        </>
    );
}

export default DisplayWinner;