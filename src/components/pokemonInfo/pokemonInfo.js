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
    console.log(pokemon.sprites.other["official-artwork"].front_default)
    return (
        <div id="pokemonInfoWrapper">
            <div id="info">
                <a onClick={props.back} id="button">&lt;</a>
                <img src={pokemon.sprites.other["official-artwork"].front_default} id={"pokemonImg"} />
                <h1>{ pokemon.name }</h1>
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
