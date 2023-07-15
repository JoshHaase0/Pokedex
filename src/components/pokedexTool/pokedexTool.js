import './pokedexTool.css';
import { useState } from 'react';
import { useEffect } from 'react';

const PokedexTool = (props) => {

  const [pokedexs, setPokedexs] = useState([]);
  

  useEffect(() => {
    if (props.pokedexs) {
      setPokedexs(props.pokedexs.map((_) => _.name));
    }
  }, props.pokedexs);


  return (
    <div id={"pokedexsWrapper"}>
      {
        (pokedexs.length > 0) ? pokedexs.map((_) => {
          return (
            <div key={_} className={"pokedexSelector"}>
              <h3>{_}</h3>
              <button onClick={() => props.logDex(_)}>Select</button>
            </div>
          )
        }) : null
      }
    </div>
  );
}

export default PokedexTool;
