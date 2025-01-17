import "./App.css";
import { useEffect, useState } from "react";
import DisplayLocations from "./components/DisplayLocations";
import DisplayBattle from "./components/DisplayBattle";
import DisplayAllPokemons from "./components/DisplayPokemons";
import DisplayLoadingPage from "./components/DisplayLoadingPage";
import DisplayWinner from "./components/DisplayWinner";
import useSound from "use-sound";

function App() {
  const [location, setLocation] = useState([]);
  const [pageState, setPageState] = useState("location");
  const [areaEncounters, setAreaEncounters] = useState([]);
  const [userPokemons, setUserPokemons] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [winnerPokemon, setWinnerPokemon] = useState({});
  const [playerHP, setPlayerHP] = useState(0);
  const [enemyHP, setEnemyHP] = useState(0);
  const [playSound] = useSound("/sounds/ready.mp3");
  const [playSound2] = useSound("/sounds/soundFight.mp3");
  const [count, setCount] = useState(0);

  const calculateDamage = (attacker, defender) => {
    const random = Math.floor(Math.random() * 38) + 217;
    const result =
      ((((2 / 5 + 2) * attacker.stats[1].base_stat * 60) /
        defender.stats[2].base_stat /
        50 +
        2) *
        random) /
      255;
    return result;
  };

  const navigateToWinnerPage = () => {
    setTimeout(() => setPageState("showWinner"), 1500);
  };

  const handleBattle = (player, enemy) => {
    if (player.stats[5].base_stat > enemy.stats[5].base_stat) {
      let damage = calculateDamage(player, enemy);
      if (enemyHP - damage > 0) {
        setEnemyHP(Math.floor(enemyHP - damage));
        damage = calculateDamage(enemy, player);
        if (playerHP - damage > 0) {
          setPlayerHP(Math.floor(playerHP - damage));
        } else {
          setPlayerHP(0);
          setWinnerPokemon(enemy);
          navigateToWinnerPage();
        }
      } else {
        setEnemyHP(0);
        setUserPokemons([...userPokemons, enemy]);
        setWinnerPokemon(player);
        console.log(winnerPokemon);
        navigateToWinnerPage();
        console.log("won");
      }
    } else {
      let damage = calculateDamage(enemy, player);
      if (playerHP - damage > 0) {
        setPlayerHP(Math.floor(playerHP - damage));
        damage = calculateDamage(player, enemy);
        if (enemyHP - damage > 0) {
          setEnemyHP(Math.floor(enemyHP - damage));
        } else {
          setEnemyHP(0);
          setUserPokemons([...userPokemons, enemy]);
          setWinnerPokemon(player);
          navigateToWinnerPage();
          console.log("won");
        }
      } else {
        setPlayerHP(0);
        setWinnerPokemon(enemy);
        navigateToWinnerPage();
      }
    }
  };

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
      setUserPokemons(pokemons);
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

  const handleLocation = async (locationName) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/location/${locationName}`
    );
    const locationData = await response.json();

    const fetchLocationArea = async (url) => {
      const response = await fetch(url);
      const areaData = await response.json();

      fetchEncounters(areaData.pokemon_encounters);
    };

    const fetchEncounters = async (data) => {
      const responses = await data.map(async (pokemon) => {
        const pokemonUrlPromise = await fetch(pokemon.pokemon.url);
        const urlData = await pokemonUrlPromise.json();
        return urlData;
      });
      const pokemons = await Promise.all(responses);
      setAreaEncounters(pokemons);
    };

    await fetchLocationArea(locationData.areas[0].url);
    setPageState("selectpokemons");
  };

  const handleSelectedEnemyPokemon = (enemyPokemon) => {
    setEnemyPokemon(enemyPokemon);
  };

  const handleSelectedUserPoemon = (pokemon) => {
    setPlayerPokemon(pokemon);
    console.log(pokemon);
  };

  const handleBackToLocations = () => {
    setPageState("location");
  };

  const handleGoToArenaButton = () => {
    if (enemyPokemon && playerPokemon) {
      setPageState("loadingPage");
      setEnemyHP(enemyPokemon.stats[0].base_stat);
      setPlayerHP(playerPokemon.stats[0].base_stat);
      playSound();
    } else {
      console.log("Please select the pokemons");
    }
  };

  const setPage = (pageName) => {
    setTimeout(() => {
      setPageState(pageName);
    }, 10000);
  };

  const playFightSound = () => {
    if (count <= 1) {
      playSound2("/sounds/soundFight.mp3");
      setCount(count + 1);
    }
  };

  return (
    <div className="App">
      {pageState === "location" ? (
        <DisplayLocations location={location} onClick={handleLocation} />
      ) : pageState === "battle" ? (
        <DisplayBattle
          player={playerPokemon}
          enemy={enemyPokemon}
          handler={handleBattle}
          eHP={enemyHP}
          pHP={playerHP}
          sound={playFightSound}
        />
      ) : pageState === "selectpokemons" && areaEncounters ? (
        <DisplayAllPokemons
          enemyPokemonList={areaEncounters}
          userPokemonList={userPokemons}
          onClick={handleSelectedUserPoemon}
          enemySelect={handleSelectedEnemyPokemon}
          goArena={handleGoToArenaButton}
        />
      ) : pageState === "loadingPage" ? (
        <DisplayLoadingPage
          page={setPage}
          player={playerPokemon}
          enemy={enemyPokemon}
        />
      ) : pageState === "showWinner" ? (
        <DisplayWinner
          winnerPokemon={winnerPokemon}
          handler={handleBackToLocations}
        ></DisplayWinner>
      ) : (
        <p>No areas available for the selected location.</p>
      )}
    </div>
  );
}

export default App;
