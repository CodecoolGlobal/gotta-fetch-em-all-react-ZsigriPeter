import "./App.css";
import { useEffect, useState } from "react";
import DisplayLocations from "./components/DisplayLocations";
import DisplayEncounters from "./components/DisplayEncounters";

function App() {
  const [location, setLocation] = useState([]);
  const [locationAreas, setLocationAreas] = useState(null);
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
          console.log(encounterData);
        })
        .catch((error) => console.error("Error while fetching Area encounters", error));
    }
  }, [locationAreas]);
 
  return (
  <div className="App">
    {!selectedLocation ? (
      <DisplayLocations location={location} onClick={handleLocationName} />
    ) : (
      locationAreas && locationAreas.areas && locationAreas.areas[0] ? (
        <DisplayEncounters name={areaEncounters.pokemon_encounters} />
      ) : (
        <p>No areas available for the selected location.</p>
      )
    )}
  </div>
  );
}


export default App;
