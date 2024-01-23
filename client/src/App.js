import "./App.css";
import { useEffect, useState } from "react";
import DisplayLocations from "./components/DisplayLocations";
import DisplayEnemyPokemons from "./components/DisplayPokemons";

function App() {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [areaEncounters, setAreaEncounters] = useState([]);



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
      const pokemons = await Promise.all(response)
      setAreaEncounters(pokemons);
    };

    setSelectedLocation(true);
  };


  return (
    <div className="App">
      {!selectedLocation ? (
        <DisplayLocations location={location} onClick={handleLocation} />
      ) : areaEncounters ? (
        <DisplayEnemyPokemons data={areaEncounters}/>
      ) : (
        <p>No areas available for the selected location.</p>
      )}
    </div>
  );
}

export default App;
