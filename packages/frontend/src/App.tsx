import React, { useState } from 'react';
import { useGetPokemonByNameQuery } from './app/services/pokemon';
import './App.css';
import styles from './Pokemon.module.css';

const getNameFromInput = (input:string|undefined) => {
  if(input === undefined) {
    console.warn("INPUT IS UNDEFINED", input);
    return "";
  }
  return input;
}

function App() {
  const [pokemonName, setPokemonName] = useState('bulbasaur');
  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemonName);
  let emptyInput = pokemonName === "";
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to the Pokemon page that uses RTK Query
        </p>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label="Which pokemon do you want to know about?"
            value={pokemonName}
            onChange={(e) => setPokemonName(getNameFromInput(e.target.value))}
          />
        </div>
        <div>
          {isLoading || emptyInput ? (
            <div></div>
          ) : (
            <div>
              {data?.sprites ? (
                <img src={data?.sprites.front_shiny} className="pokemon-img" alt="poke" width="400" height="500" />
              ) : (
                <b>Error: No such pokemon: {pokemonName}</b>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
