import './pokemonInfo.css';
import { useState } from 'react';
import { useEffect } from 'react';

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

  useEffect(() => {
    updatePokemon(props.pokemon);
  }, [props.pokemon]);
  
  const updatePokemon = async (name) => {
    const Pokemon = await props.module.getPokemonByName(name);
    setPokemon(Pokemon);
  }

  if (pokemon) {
    return (
        <div id="pokemonInfoWrapper">
            <div id="buttons">
                <button onClick={props.back}>back</button>
            </div>
            <div id="info">
                <img src={pokemon.sprites.front_default} id={"pokemonImg"} />
                <div id="types">
                {
                    pokemon.types.map((_) => <img src={types[_.type.name]} className={"icon"} />)
                }
                </div>
            </div>
        </div>
    )
  } else {
    return null;
  }
}

export default PokemonInfo;
