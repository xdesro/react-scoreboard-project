import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var PLAYERS = [
  {
    name: "Henry Desroches",
    score: 31,
    id: 1,
  },
  {
    name: "Person McPherson",
    score: 35,
    id: 2,
  },
  {
    name: "Fella O'Mann",
    score: 42,
    id: 3,
  },
]

ReactDOM.render(
  <App initialPlayers={PLAYERS} />,
  document.getElementById('root')
);
