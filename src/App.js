import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

import PokedexTool from './components/pokedexTool/pokedexTool';
import PokemonTool from './components/pokemonTool/pokemonTool';

const _Pokedex = require("pokeapi-js-wrapper")
const Pokedex = new _Pokedex.Pokedex();

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
  }, [pokemonList]);

  const setDex = async (name) => {
    setSelectedDex(name);
    const pokemon = await Pokedex.getPokedexByName(name)
    setPokemonList(pokemon.pokemon_entries.map((_) => _.pokemon_species.name));
  }
  const getPokemon = async () => {
    const pokemon = await Pokedex.getPokedexByName(selectedDex);
    return pokemon.pokemon_entries.map((_) => _.pokemon_species.name);
  }

  return (
    <div>
      {(!valid) ? <PokedexTool pokedexs={pokedexs} module={Pokedex} setDex={setDex}/> : <PokemonTool pokedex={selectedDex} module={Pokedex} />}
    </div>
  );
}

export default App;
