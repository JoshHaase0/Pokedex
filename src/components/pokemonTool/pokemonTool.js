import './pokemonTool.css';
import PokemonInfo from "../pokemonInfo/pokemonInfo";
import { useState } from 'react';
import { useEffect } from 'react';
import err from '../../icons/err.png';

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

  if (!moreInfo && pokemon.length > 0) {
      document.title = `${props.pokedex.replace(props.pokedex[0], props.pokedex[0].toUpperCase()).replace("-", " ")}`
      return (
        <div id={"pokemonWrapper"}>
          <div id={"button-wrapper"}>
            <a onClick={props.back_button} id="back-button">&lt;</a>
          </div>
          {
            (pokemon.length > 0) ? pokemon.map((_) => {
              return (
                <div key={_} className={"pokemonSelector"} onClick={() => showMoreInfo(_)}>
                  <h3>{_.replace(_[0], _[0].toUpperCase())}</h3>
                </div>
              )
            }) : null
          }
        </div>
      );
  } else if (pokemon.length <= 0) {
    return (
      <div id={"pokemonWrapper"}>
          <div id={"button-wrapper"}>
            <a onClick={props.back_button} id="back-button">&lt;</a>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <img src={err} alt={"error"} style={{width: "256px", height: "256px"}}/>
          </div>
      </div>
    )
  } else {
    return <PokemonInfo pokemon={selectedPokemon} module={props.module} back={clickBack}/>;
  }
}

export default PokedexTool;
