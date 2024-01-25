import DisplayEnemyPokemon from "./DisplayEnemyPokemons";

export default function DisplayAllPokemons(props) {
  const userPokemons = props.userPokemonList;
  const enemyPokemons = props.enemyPokemonList;

  function getRandomPokemon(enemyPokemons) {
    const pokemonIDs = [];
    enemyPokemons.map((pokemon) => pokemonIDs.push(pokemon.id));

    const randomIndex = Math.floor(Math.random() * pokemonIDs.length);
    const randomPokemonID = pokemonIDs[randomIndex];

 
    const randomPokemonIndex = enemyPokemons.findIndex(
      (x) => x.id === randomPokemonID
    );
    console.log(enemyPokemons[randomPokemonIndex]);
    return enemyPokemons[randomPokemonIndex]
  }

  return (
    <div>
      <div className="allPokemons">
        <div className="userPokemonContainer">
          <h1>You'r Pokemons: </h1>
          {userPokemons.map((pokemon) => {
            return (
              <div className="pokemons">
                <div
                  className="userPokemons"
                  key={pokemon.id}
                  onClick={() => props.onClick(pokemon)}
                >
                  <div className="pokemon-front">
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.sprites.front_default} alt="" />
                  </div>
                  <div className="pokemon-back">
                    <h2>{`${pokemon.stats[0].stat.name}: `} </h2>
                    <h2>{pokemon.stats[0].base_stat}</h2>
                    <h2>{`${pokemon.stats[1].stat.name}: `}</h2>
                    <h2>{pokemon.stats[1].base_stat}</h2>
                    <h2>{`${pokemon.stats[2].stat.name}: `}</h2>
                    <h2>{pokemon.stats[2].base_stat}</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="enemyPokemonContainer">
          <h1>Enemy Pokemons: </h1>
          {enemyPokemons.map((pokemon) => {
            return (
              <DisplayEnemyPokemon
                pokemonName={pokemon}
                enemySelect={props.enemySelect}
              />
            );
          })}
        </div>
      </div>
      <button onClick={() => getRandomPokemon(enemyPokemons)}>
        Get random Enemy
      </button>
      <button onClick={() => props.goArena()}>Go to the Arena</button>
    </div>
  );
}
