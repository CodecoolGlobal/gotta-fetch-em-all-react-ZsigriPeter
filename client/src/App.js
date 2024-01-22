import './App.css';
import { useEffect, useState } from 'react';
import DisplayLocations from './components/DisplayLocations';
import DisplayEncounters from './components/DisplayEncounters';



function App() {
  const [location, setLocation] = useState([])
  const [chosenName, setChosenName] = useState(null);
  
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/location')
    .then(response => response.json())
    .then(data => {
      setLocation(data.results)
      console.log(data)})
    .catch(error => console.error('Error fetching locations', error))
  }, [])

  const handleLocationName = (pokemonName) => {
    setChosenName(pokemonName)
    }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/location/${chosenName}`)
    .then(response => response.json())
    .then(nameData => {
      setChosenName(nameData)
      console.log(nameData)
    })  
    .catch(error => console.log("Error while fetch chosen location", error))
  }, [chosenName])

  return (
    <div className="App">
      <DisplayLocations location={location} onClick={handleLocationName}/>
      {chosenName ? (
        <DisplayEncounters name={chosenName}/>
      ): "Sorry" }
    </div>
  );
}

export default App;
