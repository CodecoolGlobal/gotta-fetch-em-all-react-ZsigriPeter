export default function getPokemonUrls(props) {
  console.log(props);
  if (props) {
    const pokemons = [];
    props.map((pokemon) => pokemons.push(pokemon.pokemon.url));
    return pokemons;
  }
}
