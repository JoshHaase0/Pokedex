import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

import PokedexTool from './components/pokedexTool/pokedexTool';

const _Pokedex = require("pokeapi-js-wrapper")
const Pokedex = new _Pokedex.Pokedex();

import  

function App() {

  const [pokedexs, setPokedexs] = useState(null);
  const [selectedDex, setSelectedDex] = useState(null);
  const [pokemonList, setPokemonList] = useState(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    Pokedex.getPokedexs()
    .then((res) => {
      setPokedexs(res.results);
    })
  }, []);

  useEffect(() => {
    if (pokemonList !== null && pokemonList !== undefined) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, pokemonList);

  const logDex = async (name) => {
    const pokemon = await Pokedex.getPokedexByName(name);
    setPokemonList(pokemon.pokemon_entries.map((_) => _.pokemon_species.name))
    
    console.log(pokemonList);
  }

  return (
    <div>
      {(!valid) ? <PokedexTool pokedexs={pokedexs} module={Pokedex} logDex={logDex}/> : null}
    </div>
  );
}

export default App;
