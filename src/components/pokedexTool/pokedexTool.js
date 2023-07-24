import './pokedexTool.css';
import { useState } from 'react';
import { useEffect } from 'react';


import inactive from '../../icons/inactive.gif';
import active from '../../icons/active.gif';

const PokedexTool = (props) => {

  const [pokedexs, setPokedexs] = useState([]);
  

  useEffect(() => {
    if (props.pokedexs) {
      setPokedexs(props.pokedexs.map((_) => _.name));
    }
  }, [props.pokedexs]);

  document.title = `Choose a Pokedex!`;
  return (
    <div id={"pokedexsWrapper"}>
      <div id={"searchButton"} onClick={() => props.search()}>
        <img src={inactive} className={"inactive"}/>
        <img src={active} className={"active"}/>
      </div>
      {
        (pokedexs.length > 0) ? pokedexs.map((_, i) => {
          return (
            <div key={_} className={"pokedexSelector"} onClick={() => props.setDex(_)} data-testid={`pokedex-region${i}`}>
              <p>{_.replace(_[0], _[0].toUpperCase()).replace("-", " ")}</p>
            </div>
          )
        }) : null
      }
    </div>
  );
}

export default PokedexTool;
