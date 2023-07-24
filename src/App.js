import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';


import PokedexTool from './components/pokedexTool/pokedexTool';
import PokemonTool from './components/pokemonTool/pokemonTool';
import PokemonInfo from './components/pokemonInfo/pokemonInfo';
import Searchbar from './components/Searchbar/Searchbar';

import { Pokedex as _Pokedex } from 'pokeapi-js-wrapper';

const Pokedex = new _Pokedex({
  timeout: 5 * 1000,
});

function App() {

  const [pokedexs, setPokedexs] = useState(null);
  const [selectedDex, setSelectedDex] = useState(null);
  const [pokemonList, setPokemonList] = useState(null);
  const [valid, setValid] = useState(false);
  const [viewInfo, setViewInfo] = useState(false);
  const [search, setSearch] = useState(true);
  const [backToSearch, setBackToSearch] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState("");

  useEffect(() => {
    Pokedex.getPokedexs()
    .then((res) => {
      setPokedexs(res.results);
    })
  }, []);

  useEffect(() => {
    if (pokemonList !== null && pokemonList !== undefined) {
      setValid(true);
      setSearch(false);
    } else {
      setValid(false);
    }
  }, [pokemonList]);

  const setDex = async (name) => {
    setSelectedDex(name);
    const pokemon = await Pokedex.getPokedexByName(name)
    setPokemonList(pokemon.pokemon_entries.map((_) => _.pokemon_species.name));
  }

  const setSearchTrue = () => {
    setSearch(true);
    setValid(true);
  }

  const back_button = () => {
    if (!viewInfo) {
      setValid(false);
      setSearch(false);
    } else {
      setViewInfo(false);
      if (backToSearch) {
        setSearch(true);
      }
    }
  }

  const showMoreInfo = async (name) => {
    await setSelectedPokemon(name);
    setViewInfo(true);
    if (search) {
      setSearch(false);
      setBackToSearch(true);
    } else {
      setBackToSearch(false);
    }
  }


  return (
    <div>
      {(!valid) ? <PokedexTool pokedexs={pokedexs} module={Pokedex} setDex={setDex} search={setSearchTrue} /> : (search) ? <Searchbar module={Pokedex} back_button={back_button} showMoreInfo={showMoreInfo} /> : (!viewInfo) ? <PokemonTool pokedex={selectedDex} module={Pokedex} back_button={back_button} showMoreInfo={showMoreInfo} /> : <PokemonInfo pokemon={selectedPokemon} module={Pokedex} back={back_button} />}
    </div>
  );
}

export default App;
