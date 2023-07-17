import './pokemonTool.css';
import PokemonInfo from "../pokemonInfo/pokemonInfo";
import { useState } from 'react';
import { useEffect } from 'react';

const PokedexTool = (props) => {

  const [pokemon, setPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [moreInfo, setMoreInfo] = useState(false);

  useEffect(() => {
    updatePokemon();
  }, []);

  const updatePokemon = async () => {
    const Pokemon = await props.module.getPokedexByName(props.pokedex);
    setPokemon(Pokemon.pokemon_entries.map((_) => _.pokemon_species.name));
  }

  const showMoreInfo = async (name) => {
    await setSelectedPokemon(name);
    setMoreInfo(true);
  }

  const clickBack = () => {
    setMoreInfo(false);
  }

  if (!moreInfo) {
      return (
        <div id={"pokemonWrapper"}>
          <div id={"button-wrapper"}>
            <a onClick={props.back_button} id="back-button">&lt;</a>
          </div>
          {
            (pokemon.length > 0) ? pokemon.map((_) => {
              return (
                <div key={_} className={"pokemonSelector"} onClick={() => showMoreInfo(_)}>
                  <h3>{_}</h3>
                  <button onClick={() => showMoreInfo(_)}>Select</button>
                </div>
              )
            }) : null
          }
        </div>
      );
  } else {
    return <PokemonInfo pokemon={selectedPokemon} module={props.module} back={clickBack}/>;
  }
}

export default PokedexTool;
