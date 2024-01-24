
function DisplayBattle(props) {
    const playerPokemon = props.player;
    const enemyPokemon = props.enemy;
    const handler=props.handler;
    const eHP=props.eHP;
    const pHP=props.pHP;

    return (
        <>
        <div className="battle-area" >
            <div className="player-pokemon">
                <p className="pokemon-hp">HP:{pHP}</p>
                <img src={playerPokemon.sprites.other.showdown.back_default} width='200px' height='200px' alt="player pokemon"/>
                <p className="pokemon-name">{playerPokemon.name}</p>
                <p className="pokemon-stat">ATTACK:{playerPokemon.stats[1].base_stat}, DEFENSE:{playerPokemon.stats[2].base_stat}</p>
            </div>
            <div className="enemy-pokemon">
                <p className="pokemon-hp">HP:{eHP}</p>
                <img src={enemyPokemon.sprites.other.showdown.front_default} width='200px' height='200px' alt="enemy pokemon"/>
                <p className="pokemon-name">{enemyPokemon.name}</p>
                <p className="pokemon-stat">ATTACK:{enemyPokemon.stats[1].base_stat}, DEFENSE:{enemyPokemon.stats[2].base_stat}</p>
            </div>
        </div>
        <div>
        <button onClick={()=>handler(playerPokemon,enemyPokemon)}>START BATTLE</button>
        </div>
        </>
    );
}

export default DisplayBattle;