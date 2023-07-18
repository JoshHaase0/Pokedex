import './pokedexTool.css';
import { useState } from 'react';
import { useEffect } from 'react';

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
      {
        (pokedexs.length > 0) ? pokedexs.map((_) => {
          return (
            <div key={_} className={"pokedexSelector"} onClick={() => props.setDex(_)}>
              <p>{_.replace(_[0], _[0].toUpperCase()).replace("-", " ")}</p>
              {/* <button onClick={() => props.setDex(_)}>View</button> */}
            </div>
          )
        }) : null
      }
    </div>
  );
}

export default PokedexTool;
