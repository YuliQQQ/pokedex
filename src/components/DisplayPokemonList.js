import React from 'react';

import DisplayPokemon from './DisplayPokemon';

const DisplayPokemonList = ({ pokemonList, handleLoadMore, handlePokemonClick, pokemon, searching }) => {
  return (
    <div className="pokedex">
      {
        searching ? <DisplayPokemon pokemon={pokemon} /> : pokemonList && pokemonList.map(pokemon => (
          <DisplayPokemon key={pokemon.id} pokemon={pokemon} handlePokemonClick={handlePokemonClick} />
        ))
      }

      {
        !searching && pokemonList.length < 151 && <button name="button-load" className="load-more" onClick={handleLoadMore}>Load More</button>
      }
      
    </div>
  )
};

export default DisplayPokemonList;  