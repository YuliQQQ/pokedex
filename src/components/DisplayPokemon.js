import React from 'react';

import upperCaseFirstLetter from '../helpers/upperCaseFirstLetter';
import addZero from '../helpers/addZero';

const DisplayPokemon = ({ pokemon, handlePokemonClick }) => (
  <div>
    <div className="pokemon">
      <a><img className={`pokemon__image  ${pokemon.types[0]}`} src={pokemon.website} alt={pokemon.name} onClick={handlePokemonClick} /></a>
      <p className="pokemon__id">#{addZero(pokemon.id)}</p>
      <p className="pokemon__name">{upperCaseFirstLetter(pokemon.name)}</p>   
    </div>
  
  </div>
);

export default DisplayPokemon;