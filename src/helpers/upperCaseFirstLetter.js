const upperCaseFirstLetter = (pokemon) => {
  if(!pokemon)
  {
    return;
  }
  return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
};

export default upperCaseFirstLetter;