## About

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is a simple "Scoreboard" app I built using React. When I built the app originally, I was actually using ES5 Syntax and an outdated version of React. So before deployment, I had to spend some time porting over to ES6.

The app is deployed to GitHub Pages using the gh-pages npm plugin.

## Features

The app has a few pre-set players, each with their own score. A player's score can be incremented or decremented, and players can also be removed. When a new player is added with the form component, their score is automatically set to 0. There are a few counters at the top that keep track of player count, as well as total score. Additionally, there is a simple stopwatch to keep track of turn lengths.

## Setup

`npm start` spins up the app, lints and livereloads. 

`npm run build` will build the app, and `npm run deploy` will build and then deploy the app to GitHub Pages.