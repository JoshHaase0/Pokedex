import './pokemonTool.css';
import { createRef, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import err from '../../icons/err.png';
import { useIsVisible } from '../../observer/observer';

const PokedexTool = (props) => {

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    updatePokemon();
  }, []);

  const updatePokemon = async () => {
    const Pokemon = await props.module.getPokedexByName(props.pokedex);
    setPokemon(Pokemon.pokemon_entries.map((_) => _.pokemon_species.name));
  }

  if (pokemon.length > 0) {
      document.title = `${props.pokedex.replace(props.pokedex[0], props.pokedex[0].toUpperCase()).replace("-", " ")}`
      return (
        <div id={"pokemonWrapper"}>
          <div id={"button-wrapper"}>
            <a onClick={props.back_button} id="back-button" data-testid={"back-button"}>&lt;</a>
          </div>
          {
            (pokemon.length > 0) ? pokemon.map((_, i) => {
              return <PokemonTab name={_.replace(_[0], _[0].toUpperCase())} reactKey={_} showMoreInfo={props.showMoreInfo} i={i}/>;
                {/* <div key={_} className={"pokemonSelector"} onClick={() => props.showMoreInfo(_)} data-testid={`pokedex-pokemon${i}`}>
                  <h3>{_.replace(_[0], _[0].toUpperCase())}</h3>
                </div> */}
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
  }
}


const PokemonTab = (props) => {
  return (
    <div key={props.reactKey} className={"pokemonSelector"} onClick={() => props.showMoreInfo(props.reactKey)} data-testid={`pokedex-pokemon${props.i}`}>
      <h3>{props.name}</h3>
      {
        // (isVisible) ? console.log(props.name + " is visible") : null
      }
    </div>
  )
}


export default PokedexTool;
