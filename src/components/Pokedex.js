import React from 'react';

import Header from './Header';
import DisplayPokemonList from './DisplayPokemonList';
import DisplayInformationModal from './DisplayInformationModal';

import pokemonAPI from '../helpers/pokemonAPI';
import Search from './Search';

export default class Pokemon extends React.Component
{ 
  state = {
    pokemonList: [],
    pokemon: {
      website: '',
      name: '',
      id: '',
      types: [],
      height: '',
      weight: '',
      stats: []
    },
    nextWebsite: '',
    error: undefined,
    searching: false,
    modal: false,
    stats: []
  };

  componentDidMount = async () => {
    let pokemon = [];

    const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/";

    for(let i = 1; i <= 12; i++)
    {
      const data = await pokemonAPI(POKEMON_URL.concat(`${i}/`));
      
      let pokemonTypes = [];
      data.types.forEach(type => pokemonTypes.push(type.type.name));

      let pokemonInsideForLoop = {
        website: data.sprites.other["official-artwork"].front_default,
        name: data.name,
        id: data.id,
        types: pokemonTypes,
        height: data.height/10,
        weight: data.weight/10,
        stats: data.stats
      };

      pokemon.push(pokemonInsideForLoop);
    }

    this.setState(() => ({
      pokemonList: pokemon,
      nextWebsite: 'https://pokeapi.co/api/v2/pokemon/?offset=12&limit=12',
    }));
  }

  handleLoadMore = async (e) => {   
    document.querySelector(`.${e.target.className}`).disabled = true;

    let json = await pokemonAPI(this.state.nextWebsite);
    let nextWebsite = json.next;
    let websiteList = [];
    let pokemonList = [];

    json.results.forEach(result => websiteList.push(result.url));

    for(const website of websiteList)
    {
      const data = await pokemonAPI(website);
      let pokemonTypes = [];

      if(data.id === 152)
      {
        break;
      }

      data.types.forEach(type => pokemonTypes.push(type.type.name));

      let pokemonInsideForLoop = {
        website: data.sprites.other["official-artwork"].front_default,
        name: data.name,
        id: data.id,
        types: pokemonTypes,
        height: data.height/10,
        weight: data.weight/10,
        stats: data.stats
      };

      pokemonList.push(pokemonInsideForLoop);
    }

    this.setState((prevState) => ({
      pokemonList: prevState.pokemonList.concat(pokemonList),
      nextWebsite: nextWebsite
       
    }));

    document.querySelector(`.${e.target.className}`).disabled = false;
  };

  handlePokemonClick = (e) => {
    let pokemonName = e.target.alt;

    const pokemonFound = this.state.pokemonList.find(pokemon => pokemon.name === pokemonName);

    this.setState(() => ({ 
      pokemon: pokemonFound,
      error: '',
      modal: true,
    }));
  };

  handleSearch = async (e) => {
    e.preventDefault();

    if(!e.target.search.value)
    {
      return;
    }

    const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/`;
    const search = e.target.search.value.toLowerCase();
    const pokemonTypes = [];

    try
    {
      let data = await pokemonAPI(POKEMON_URL.concat(`${search}/`));

      if(data === 'Pokemon Not Found')
      {
        throw data;
      }
      else
      {
        data.types.forEach(type => pokemonTypes.push(type.type.name));

        if(data.id <= 151)
        {
          this.setState(() => ({
            pokemon: {
              website: data.sprites.other["official-artwork"].front_default,
              name: data.name,
              id: data.id,
              types: pokemonTypes,
              height: data.height/10,
              weight: data.weight/10,
              stats: data.stats
            },
            error: '',
            searching: true,
            modal: true
          }))
        }
        else
        {
          this.setState(() => ({
            pokemon: undefined,
            error: 'Generation 1 only :)',
            searching: false,
            modal: false
          }));
        }
      }   
      
    }
    catch(error)
    {
      this.setState(() => ({
        pokemon: undefined,
        error,
        searching: false,
        modal: false
      }));

    }  
  };

  handleClearPokemon = () => {
    this.setState(() => ({
      pokemon: undefined,
      modal: false 
    }));
  }

  render()
  {
    const { pokemonList, pokemon, pokemonSearched, nextWebsite, error, modal } = this.state;

    return (
      <div>
        <div className="header-flex">
          <Header />
          <Search 
            handleSearch={this.handleSearch}
            error={error}
          />
        </div>

        <DisplayPokemonList
          pokemonList={pokemonList}
          handleLoadMore={this.handleLoadMore}
          handlePokemonClick={this.handlePokemonClick} 
          pokemon={pokemon}
        />
        <DisplayInformationModal
          pokemon={pokemon}
          modal={modal}
          handleClearPokemon={this.handleClearPokemon}
        />
      </div>
    )
  }
}