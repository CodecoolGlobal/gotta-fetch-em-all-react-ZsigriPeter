
function DisplayUsersPokemon(props) {
    const usersPokemon = props.pokemonList;
    console.log(props.pokemonList);
    return (
        <div className="users-pokemon">
            {usersPokemon.map((pokemon,index) => (
                <>
                {console.log(pokemon)}
                <button key={index}>{pokemon.name}</button>
                </>
            ))}
        </div>
    );
}

export default DisplayUsersPokemon;