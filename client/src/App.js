import "./App.css";
import { useEffect, useState } from "react";
import DisplayLocations from "./components/DisplayLocations";
import getPokemonUrls from "./functions/getPokemonUrls";
//import DisplayPokemons from "./components/DisplayPokemons";

function App() {
  const [location, setLocation] = useState([]);
  const [locationAreas, setLocationAreas] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [areaEncounters, setAreaEncounters] = useState([]);
  //const [foundPokemon, setFoundPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/location")
      .then((response) => response.json())
      .then((data) => {
        setLocation(data.results);
      })
      .catch((error) => console.error("Error fetching locations", error));
  }, []);

  const handleLocationName = (pokemonName) => {
    setLocationAreas(pokemonName);
    console.log(pokemonName);
    setSelectedLocation(true);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/location/${locationAreas}`)
      .then((response) => response.json())
      .then((nameData) => {
        setLocationAreas(nameData);
        console.log(nameData);
      })
      .catch((error) =>
        console.log("Error while fetch chosen location", error)
      );
  }, [locationAreas]);

  useEffect(() => {
    if (locationAreas && locationAreas.areas) {
      fetch(locationAreas.areas[0].url)
        .then((response) => response.json())
        .then((encounterData) => {
          setAreaEncounters(encounterData);
        })
        .catch((error) =>
          console.error("Error while fetching Area encounters", error)
        );
    }
  }, [locationAreas]);

     /* useEffect(() => {
      if(areaEncounters.length > 0) {
        areaEncounters.map(pokemon => {
          fetch(pokemon.url)
          .then((response) => response.json())
          .then((pokemonData) => {
             setPokemonDetails((prevData) => [ ...prevData, pokemonData])
             console.log(pokemonDetails);
          })
          .catch((error) =>
          console.error("Error while fetching Pokemon Url", error)
        );
      }
        )
    }
  }, [areaEncounters]);    */

  // Itt Ez a useEffect lényegében helyettesíti a getPokemonUrls functiont mert itt végig mappelek és a pokemon.url-t veszem ki,
  // Szóval lehet jobb lenne így csinálni csak valamiért nem megy bele ebbe a hook-ba, és most ezt probálom megoldani.

  const handlePokemonUrls = () => {
    const locationUrls = getPokemonUrls(areaEncounters.pokemon_encounters);
    console.log(locationUrls);
    //setFoundPokemons(locationUrls)
  };

  return (
    <div className="App">
      {!selectedLocation ? (
        <DisplayLocations location={location} onClick={handleLocationName} />
      ) : locationAreas && locationAreas.areas && locationAreas.areas[0] ? (
        handlePokemonUrls()
      ) : (
        <p>No areas available for the selected location.</p>
      )}
    </div>
  );
}

export default App;
