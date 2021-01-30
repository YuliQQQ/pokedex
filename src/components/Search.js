import React from 'react';

import search from '../styles/images/search-button.png';

const Search = ({ handleSearch, error }) => (
  <div className="search">
    <form onSubmit={handleSearch}>
      <input type="text" name="search" placeholder="Generation 1 only" />
      <button><img src={search} alt="search" /></button>
    </form>
    {
      error && <p className="search__error">{error}</p>
    }
  </div>
);

export default Search;