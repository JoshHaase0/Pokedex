import './Searchbar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import err from '../../icons/err.png';

const Searchbar = (props) => {

  const [pokemon, setPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getPokemonList();
  }, [])

  const getPokemonList = async () => {
    const list = await props.module.getPokedexByName('national');
    setPokemon(list.pokemon_entries);
  }


  const updateQuery = (e) => {
    setSearchQuery(e.target.value.trim());
  }

  return (
    <div id={"pokemonWrapper"}>
          <div id={"button-wrapper"}>
            <a onClick={props.back_button} id="back-button" data-testid={"back-button"}>&lt;</a>
      <input
        type="text"
        defaultValue={searchQuery}
        onChange={updateQuery}
        id={"searchbar"}
      />
          </div>
      {
        (pokemon.length > 0) ? pokemon.filter((_) => (_.pokemon_species.name).includes(searchQuery)).map((_, i) => {
          let name = _.pokemon_species.name;
          name = name.replace(name[0], name[0].toUpperCase());
          name = name.trim();
          let searchName = _.pokemon_species.name;
          return (
            <div key={name} className={"pokemonSelector"} onClick={() => props.showMoreInfo(searchName)} data-testid={`pokedex-pokemon${i}`}>
                  <h3>{name}</h3>
            </div>
          )
        }) : null
      }
    </div>
  )
}

export default Searchbar;
