import React, { useState } from 'react';
import { useGetPokemonByNameQuery } from './app/services/pokemon';
import { useGetFunNameQuery, useGetSuperFunNameQuery } from './app/services/names';
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
  const { data: pokemonData, error: pokemonError, isLoading: pokemonLoading } = useGetPokemonByNameQuery(pokemonName);
  const { data: funNameData, error: funNameError, isLoading: funNameLoading } = useGetFunNameQuery({name: pokemonName});
  const { data: superFunNameData, error: superFunNameError, isLoading: superFunNameLoading } = useGetSuperFunNameQuery({name: pokemonName});

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
        <h2>Pokemon image (PokeAPI)</h2>
        <div>
          {pokemonLoading || emptyInput ? (
            <div></div>
          ) : (
            <div>
              {pokemonData?.sprites ? (
                <img src={pokemonData?.sprites.front_shiny} className="pokemon-img" alt="poke" width="400" height="500" />
              ) : (
                <b>Error: No such pokemon: {pokemonName}</b>
              )}
            </div>
          )}
        </div>
        <div>
          <h2>Fun name (tRPC Response)</h2>

          {funNameError || funNameLoading ? (
            <div>Loading or error (Fun name)</div>
          ) : 
            <div>
              <span> Original name: {funNameData?.originalName} </span> <br/> 
              <span> Fun name: {funNameData?.funName} </span>
            </div>
          
          }
        </div>
        <div>
          <h2>SUPER Fun name (tRPC Response)</h2>

          {superFunNameError || superFunNameLoading ? (
            <div>Loading or error (Superfun name)</div>
          ) : 
            <div>
              <span> Original name: {superFunNameData?.originalName} </span> <br/> 
              <span> Super Fun name: {superFunNameData?.superFunName} </span>
            </div>
          
          }
        </div>
      </header>
    </div>
  );
}

export default App;
