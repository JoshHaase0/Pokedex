import './Searchbar.css';
import { useState } from 'react';
import { useEffect } from 'react';
import err from '../../icons/err.png';

const Searchbar = (props) => {

  const [pokemon, setPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeList, setTypeList] = useState([]);
  useEffect(() => {
    getPokemonList();
    setSearchQuery(props.savedSearch)
  }, [])

  const getPokemonList = async () => {
    const list = await props.module.getPokemons();
    const filteredList = list.results.filter((_) => (!_.name.includes("build") && !_.name.includes("mode")));
    setPokemon(filteredList);
  }


  const updateQuery = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
    document.title = `${e.target.value.trim().toLowerCase()}`;
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
        (pokemon.length > 0) ? pokemon.filter((_) => (_.name).includes(searchQuery)).map((_, i) => {
          let name = _.name;
          name = name.replace(name[0], name[0].toUpperCase());
          name = name.trim();
          let searchName = _.name;
          return (
            <div key={name} className={"pokemonSelector"} onClick={() => { props.updateSavedSearch(searchQuery); props.showMoreInfo(searchName) }} data-testid={`pokedex-pokemon${i}`}>
                  <h3>{name}</h3>
            </div>
          )
        }) : null
      }
    </div>
  )
}

export default Searchbar;
