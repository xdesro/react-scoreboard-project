import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
  {
    name: "Andrew Chalkley",
    score: 35,
    id: 2,
  },
  {
    name: "Alena Holligan",
    score: 42,
    id: 3,
  },
]

ReactDOM.render(
  <App initialPlayers={PLAYERS} />,
  document.getElementById('root')
);
