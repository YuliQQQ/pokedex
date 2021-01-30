const pokemonAPI = async (website) => {
  try
  {
    const response = await fetch(website);
    
    if(response.ok)
    {
      const json = response.json();
      return json;
    }

    throw 'Pokemon Not Found';

  }
  catch(error)
  {
    return error;
  }

  
};

export default pokemonAPI;