import "./App.css";
import { useEffect, useState } from "react";
import DisplayLocations from "./components/DisplayLocations";
import DisplayBattle from "./components/DisplayBattle";
import DisplayAllPokemons from "./components/DisplayPokemons";


function App() {
  const [location, setLocation] = useState([]);
  const [pageState, setPageState] = useState('location');
  const [areaEncounters, setAreaEncounters] = useState([]);
  const [usersPokemon, setUsersPokemon] = useState([]);
  const [chosenUserPokemon, setChosenUserPokemon] = useState(null);
  const [chosenEnemyPokemon, setChosenEnemyPokemon] = useState(null)
  const [playerPokemon, setPlayerPokemon]= useState(null);
  const [enemyPokemon, setEnemyPokemon]= useState(null);
  const [playerHP,setPlayerHP] = useState(0);
  const [enemyHP,setEnemyHP] = useState(0);

  const calculateDamage=(attacker,defender) => {
    const random=Math.floor(Math.random()*38)+217;
    const result=((((2/5+2)*attacker.stats[1].base_stat*60/defender.stats[2].base_stat)/50)+2)*random/255;
    return result;
  }

  const handlerBattle=(player,enemy) => {
    console.log('player:',player);
    console.log('enemy:',enemy);
    if(player.stats[5].base_stat>enemy.stats[5].base_stat) {
      let damage=calculateDamage(player,enemy);
      if(enemyHP-damage>0) {
        setEnemyHP(Math.floor(enemyHP-damage));
        damage=calculateDamage(enemy,player);
        if(playerHP-damage>0) {
          setPlayerHP(Math.floor(playerHP-damage));
        } else {
          setPlayerHP(0);
        //Battle Over, Enemy won
        }
      } else {
        setEnemyHP(0);
        //Battle Over, Player won
      }
    } else {
      let damage=calculateDamage(enemy,player);
      if(playerHP-damage>0) {
        setPlayerHP(Math.floor(playerHP-damage));
        damage=calculateDamage(player,enemy);
        if(enemyHP-damage>0) {
          setEnemyHP(Math.floor(enemyHP-damage));
        } else {
          setEnemyHP(0);
        //Battle Over, Enemy won
        }
      } else {
        setPlayerHP(0);
        //Battle Over, Enemy won
      }
    }
  }

  useEffect(()=> {
    const playerURL='https://pokeapi.co/api/v2/pokemon/charizard';
    const enemyURL='https://pokeapi.co/api/v2/pokemon/bulbasaur';
    const fetchData=async (url,state,stateHP) => {
      const response=await fetch(url);
      const jsonData=await response.json();
      state(jsonData);
      stateHP(jsonData.stats[0].base_stat);
      return jsonData;
    }
    fetchData(playerURL,setPlayerPokemon,setPlayerHP);
    fetchData(enemyURL,setEnemyPokemon,setEnemyHP);
   
  },[]);


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

    setPageState('battle');
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
      {pageState==='location' ? (
        <DisplayLocations location={location} onClick={handleLocation} />
      ) : pageState==='battle' ? (<DisplayBattle player={playerPokemon} enemy={enemyPokemon} handler={handlerBattle} eHP={enemyHP} pHP={playerHP} />) :  pageState==='selectpokemons'&&areaEncounters ? (
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
