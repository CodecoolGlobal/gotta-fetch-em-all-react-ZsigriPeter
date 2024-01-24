import "./App.css";
import { useEffect, useState } from "react";
import DisplayLocations from "./components/DisplayLocations";
import DisplayAllPokemons from "./components/DisplayPokemons";

function App() {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [areaEncounters, setAreaEncounters] = useState([]);
  const [usersPokemon, setUsersPokemon] = useState([]);
  const [chosenUserPokemon, setChosenUserPokemon] = useState(null);
  const [chosenEnemyPokemon, setChosenEnemyPokemon] = useState(null)

  useEffect(() => {
    const startingPokemonURL = [
      "https://pokeapi.co/api/v2/pokemon/bulbasaur",
      "https://pokeapi.co/api/v2/pokemon/charizard",
      "https://pokeapi.co/api/v2/pokemon/poliwhirl",
    ];
    const fetchData = async () => {
      const response = await startingPokemonURL.map(async (url) => {
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData;
      });
      const pokemons = await Promise.all(response);
      setUsersPokemon(pokemons);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((response) => response.json())
      .then((data) => {
        setLocation(data.results);
      })
      .catch((error) => console.error("Error fetching locations", error));
  }, []);

  const handleLocation = (locationName) => {
    const fetchLocation = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/location/${locationName}`
      );
      const locationData = await response.json();

      fetchLocationArea(locationData.areas[0].url);
    };
    fetchLocation();

    const fetchLocationArea = async (url) => {
      const response = await fetch(url);
      const areaData = await response.json();

      fetchEncounters(areaData.pokemon_encounters);
    };

    const fetchEncounters = async (data) => {
      const response = await data.map(async (pokemon) => {
        const pokemonUrlPromise = await fetch(pokemon.pokemon.url);
        const urlData = await pokemonUrlPromise.json();
        return urlData;
      });
      const pokemons = await Promise.all(response);
      setAreaEncounters(pokemons);
    };

    setSelectedLocation(true);
  };

  const handleSelectedEnemyPokemon = (enemyPokemon) => {
setChosenEnemyPokemon(enemyPokemon)
console.log(enemyPokemon);
  }

  const handleSelectedUserPoemon = (pokemon) => {
setChosenUserPokemon(pokemon)
console.log(pokemon);
  }

  return (
    <div className="App">
      {!selectedLocation ? (
        <DisplayLocations location={location} onClick={handleLocation} />
      ) : areaEncounters ? (
        <DisplayAllPokemons
          enemyPokemonList={areaEncounters}
          userPokemonList={usersPokemon}
          onClick={handleSelectedUserPoemon}
          enemySelect={handleSelectedEnemyPokemon}
        />
      ) : (
        <p>No areas available for the selected location.</p>
      )}
    </div>
  );
}

export default App;
