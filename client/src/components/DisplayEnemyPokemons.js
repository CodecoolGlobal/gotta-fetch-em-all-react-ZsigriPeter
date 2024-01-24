export default function DisplayEnemyPokemon(props) {
  return (
    <div className="enemy-pokemons">
      <div 
      className="enemyPokemons" 
      key={props.pokemonName.id}
      onClick={() => props.enemySelect(props.pokemonName)}>
        <div className="enemy-pokemon-front">
          <h1>{props.pokemonName.name}</h1>
          <img src={props.pokemonName.sprites.front_default} alt="" />
        </div>
        <div className="enemy-pokemon-back">
          <h2>{`${props.pokemonName.stats[0].stat.name}: `} </h2>
          <h2>{props.pokemonName.stats[0].base_stat}</h2>
          <h2>{`${props.pokemonName.stats[1].stat.name}: `}</h2>
          <h2>{props.pokemonName.stats[1].base_stat}</h2>
          <h2>{`${props.pokemonName.stats[2].stat.name}: `}</h2>
          <h2>{props.pokemonName.stats[2].base_stat}</h2>
        </div>
      </div>
    </div>
  );
}
