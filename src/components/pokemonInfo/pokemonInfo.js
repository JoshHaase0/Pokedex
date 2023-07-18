import './pokemonInfo.css';
import { useState } from 'react';
import { useEffect } from 'react';

import err from '../../icons/err.png';
import errImage from '../../icons/error.png';

import bug from '../../icons/bug.png';
import dark from '../../icons/dark.png';
import dragon from '../../icons/dragon.png';
import electric from '../../icons/electric.png';
import fairy from '../../icons/fairy.png';
import fighting from '../../icons/fighting.png';
import fire from '../../icons/fire.png';
import flying from '../../icons/flying.png';
import ghost from '../../icons/ghost.png';
import grass from '../../icons/grass.png';
import ground from '../../icons/ground.png';
import ice from '../../icons/ice.png';
import normal from '../../icons/normal.png';
import poison from '../../icons/poison.png';
import psychic from '../../icons/psychic.png';
import rock from '../../icons/rock.png';
import steel from '../../icons/steel.png';
import water from '../../icons/water.png';

const types = {
    "bug": bug,
    "dark": dark,
    "dragon": dragon,
    "electric": electric,
    "fairy": fairy,
    "fighting": fighting,
    "fire": fire,
    "flying": flying,
    "ghost": ghost,
    "grass": grass,
    "ground": ground,
    "ice": ice,
    "normal": normal,
    "poison": poison,
    "psychic": psychic,
    "rock": rock,
    "steel": steel,
    "water": water
}


const PokemonInfo = (props) => {

  const [pokemon, setPokemon] = useState(null);
  const [style, setStyle] = useState("default");
  const [altVersions, setAltVersions] = useState([{}]);
  const [errCheck, setErrCheck] = useState(false);

  useEffect(() => {
    updatePokemon(props.pokemon);
  }, [props.pokemon]);

  useEffect(() => {
    if (pokemon !== null) { setStyle(pokemon.sprites.front_default); setAltStyles(); }
  }, [pokemon]);
  
  const updatePokemon = async (name) => {
    try {
      const Pokemon = await props.module.getPokemonByName(name);
      setPokemon(Pokemon);
    } catch (e) {
      setErrCheck(true);
    }
  }

  const updateStyle = (e) => {
    try {
      setStyle(e.target.value);
      e.target.blur();
    } catch (e) {
      setErrCheck(true);
    }
  }
  const setAltStyles = () => {
    try {
      const styles = [];
      const gens = Object.keys(pokemon.sprites.versions)
      for (let i = 0; i < gens.length; i++) {
        const games = Object.keys(pokemon.sprites.versions[gens[i]]);
        for (let j = 0; j < games.length; j++) {
          const sprite = pokemon.sprites.versions[gens[i]][games[j]].front_default;
          if (sprite && games[j] != "icons") {
            styles.push({
              name: games[j].replace(games[j][0], games[j][0].toUpperCase()),
              sprite: sprite
            })
          }
        }
      }
      setAltVersions(styles);
    } catch (e) {
      setErrCheck(true);
    }
  }

  if (errCheck) { 
    document.title = "Couldn't find the Mew under the truck...";
    return (
      <div id="pokemonInfoWrapper">
            <div id="info">
                <div id={"button-wrapper"}>
                  <a onClick={props.back} id="button">&lt;</a>
                </div>
                <img src={errImage} id={"pokemonImg"} alt={`We ran into an issue!`}/>
            </div>
        </div>
    )
  } else if (pokemon) {
    document.title = `${props.pokemon.replace(props.pokemon[0], props.pokemon[0].toUpperCase())}`
    return (
        <div id="pokemonInfoWrapper">
            <div id="info" >
                <div id={"button-wrapper"}>
                  <a onClick={props.back} id="button">&lt;</a>
                  <div id="style-selector-wrapper">
                    <select id="style-selector" onChange={updateStyle}>
                      <option value={pokemon.sprites.front_default}>Default</option>
                      <option value={pokemon.sprites.front_shiny}>Shiny</option>
                      <option value={pokemon.sprites.other["dream_world"].front_default}>Dream</option>
                      <option value={pokemon.sprites.other["home"].front_default}>Home</option>
                      <option value={pokemon.sprites.other["official-artwork"].front_default}>Official</option>
                      {
                        altVersions.map((_) => {
                          return (
                            <option value={_.sprite} key={_.name}>{_.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
                <div id={"pokemonImgWrapper"}>{
                  (style.includes("https")) ? <img src={style} id={"pokemonImg"} alt={`${style} ${pokemon.name}`}/> : <img src={err} id={"pokemonImg"} alt={`${pokemon.name} does not have this style`}/>
                }</div>
                <div id="bottom-section">
                <h1>{ pokemon.name.replace(pokemon.name[0], pokemon.name[0].toUpperCase()) }</h1>
                <p>N°{ ("000" + pokemon.id).slice(-4) }</p>
                <div id="types">
                {
                    pokemon.types.map((_) => <div className={`${_.type.name} type`} key={_.type.name}><img src={types[_.type.name]} className={"icon"} /><p>{_.type.name}</p></div>)
                }
                </div>
                <div id="stats">
                  <div className={"statBox"}>
                    <p>Weight</p>
                    <div>
                      <p>{ pokemon.weight } kg</p>
                    </div>
                  </div>
                  <div className={"statBox"}>
                      <p>Height</p>
                      <div>
                        <p>{ pokemon.height / 10 } m</p>
                      </div>
                  </div>
                  <div className={"statBox"}>
                    <p>Health</p>
                    <div>
                      <p>{ pokemon.stats[0].base_stat } HP</p>
                    </div>
                  </div>
                  <div className={"statBox"}>
                    <p>Speed</p>
                    <div>
                      <p>{ pokemon.stats[5].base_stat } Spd</p>
                    </div>
                  </div>
                  <div className={"statBox"}>
                    <p>Attack</p>
                    <div>
                      <p>{ pokemon.stats[1].base_stat } Atk</p>
                    </div>
                  </div>
                  <div className={"statBox"}>
                    <p>Defense</p>
                    <div>
                      <p>{ pokemon.stats[2].base_stat } Def</p>
                    </div>
                  </div>
                  <div className={"statBox"}>
                    <p>Special Attack</p>
                    <div>
                      <p>{ pokemon.stats[3].base_stat } S. Atk</p>
                    </div>
                  </div>
                  <div className={"statBox"}>
                    <p>Special Defense</p>
                    <div>
                      <p>{ pokemon.stats[4].base_stat } S. Def</p>
                    </div>
                  </div>
                </div>
            </div>
        </div></div>
    )
  } else {
    return null;
  }
}

export default PokemonInfo;
