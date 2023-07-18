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
  const [errCheck, setErrCheck] = useState(false);

  useEffect(() => {
    updatePokemon(props.pokemon);
  }, [props.pokemon]);
  
  const updatePokemon = async (name) => {
    try {
      const Pokemon = await props.module.getPokemonByName(name);
      setPokemon(Pokemon);
    } catch (e) {
      setErrCheck(true);
    }
  }


  const updateStyle = (e) => {
    setStyle(e.target.value);
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
    let image = "";
    switch (style) {
      case "shiny":
        image = pokemon.sprites.front_shiny;
        break;
      case "dream":
        image = pokemon.sprites.other["dream_world"].front_default;
        break;
      case "home":
        image = pokemon.sprites.other["home"].front_default;
        break;
      case "official":
        image = pokemon.sprites.other["official-artwork"].front_default;
        break;
      default:
        image = pokemon.sprites.front_default;
        break;
    }
    image = (!image) ? err : image;
    return (
        <div id="pokemonInfoWrapper">
            <div id="info">
                <div id={"button-wrapper"}>
                  <a onClick={props.back} id="button">&lt;</a>
                  <select id="style-selector" onChange={updateStyle}>
                    <option value="default">Default</option>
                    <option value="shiny">Shiny</option>
                    <option value="dream">Dream</option>
                    <option value="home">Home</option>
                    <option value="official">Official</option>
                  </select>
                </div>
                <img src={image} id={"pokemonImg"} alt={`${style} ${pokemon.name}`}/>
                <h1>{ pokemon.name.replace(pokemon.name[0], pokemon.name[0].toUpperCase()) }</h1>
                <p>N°{ ("000" + pokemon.id).slice(-4) }</p>
                <div id="types">
                {
                    pokemon.types.map((_) => <div className={`${_.type.name} type`}><img src={types[_.type.name]} className={"icon"} /><p>{_.type.name}</p></div>)
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
        </div>
    )
  } else {
    return null;
  }
}

export default PokemonInfo;
