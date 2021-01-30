import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'animate.css';

import Pokedex from './components/Pokedex';

ReactDOM.render(<Pokedex />, document.getElementById('app'));