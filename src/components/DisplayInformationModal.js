import React from 'react';
import ReactModal from 'react-modal';

import upperCaseFirstLetter from '../helpers/upperCaseFirstLetter';

const DisplayInformationModal = ({ pokemon, modal, handleClearPokemon }) => {
  const statsTable = (stat) => { 
    const list = [];
    
    for(let i = 0; i < 20; i++)
    {
      if(i < parseInt(stat/15))
      {
        list.push(<li key={i} className="lists darken"></li>)
      }
      else
      {
        list.push(<li key={i} className="lists no-darken"></li>)
      }
    }

    return list;
  };

  return (
    <ReactModal
      isOpen={modal}
      onRequestClose={handleClearPokemon}
      contentLabel="Selected Pokemon"
      ariaHideApp={false}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div>       
        {
          !!pokemon && <div className="selected-pokemon"> 
            <img className={`selected-pokemon ${pokemon.types[0]}`} src={pokemon.website} alt={pokemon.name} />
            <div className="selected-pokemon__display-information">
              <h1 className="display-information__name">{upperCaseFirstLetter(pokemon.name)}</h1>
              {
                pokemon.types.map(type => <span key={type} className={`display-information__types ${type}`}>{type}</span>)
              }
  
              <div className="display-information__weight-and-height">
                <div className="weight-and-height__weight"> 
                  <p className="weight-and-height__value">{pokemon.weight} KG</p>
                  <p className="weight-and-height__header">WEIGHT</p>
                </div>
                <div className="weight-and-height__height"> 
                  <p className="weight-and-height__value">{pokemon.height} M</p>
                  <p className="weight-and-height__header">HEIGHT</p>
                </div>             
              </div>

              <p className="base-stats">Base Stats</p>
              
              <div className="stats">
                {
                  pokemon.stats.map(stat => 
                    <div key={stat.stat.name}>
                      <p className="stats__name">{ stat.stat.name }</p>
                      <ul className="stats__lists">
                        {
                          statsTable(stat.base_stat)
                        }
                      </ul>
                      
                    
                    </div>
                  )
                }
              </div>
            </div> 
            
          </div> // className= modal
        }   
        <button className="modal-close-button" onClick={handleClearPokemon}>Close</button>
      </div>
    </ReactModal>
    
  );
}

export default DisplayInformationModal;