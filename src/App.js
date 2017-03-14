import React from 'react';
// import logo from './logo.svg';
import './App.css';



var nextId = 4

class Application extends React.Component {  
  constructor(props) {
    super(props);
      this.state = {
        players: props.initialPlayers
      };
      this.onScoreChange = this.onScoreChange.bind(this);
      this.onPlayerAdd = this.onPlayerAdd.bind(this);
  }
  
  onScoreChange(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  }

  onPlayerAdd(name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    this.setState(this.state);
    nextId += 1;
  }

  onRemovePlayer(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  }

  render () {
    return (
      <div className="scoreboard">

        <Header title={this.props.title} players={this.state.players} />
      
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player 
                onScoreChange={function(delta) {this.onScoreChange(index ,delta)}.bind(this)}
                onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                name={player.name} 
                score={player.score} 
                key={player.id} />
            );
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    );
  }
}

Application.defaultProps = {
  title: "Scoreboard",
};

Application.propTypes = {
  title: React.PropTypes.string,
  initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
  })).isRequired,
};

class Header extends Application {
  render() {
    return (
      <div className="header">
        <Stats players={this.props.players}/>
        <h1>{this.props.title}</h1>
        <Stopwatch players={this.props.players}/>
      </div>
    );
  }  
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};

class Stopwatch extends Header{
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    };
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onTick = this.onTick.bind(this);

  }
  componentDidMount() {
    this.interval = setInterval(this.onTick, 100);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onTick() {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
  }
  onStart() {
    this.setState({
      running: true,
      previousTime: Date.now(),
    })
  }
  onStop() {
    this.setState({
      running:false,
    })
  }
  onReset() {
    this.setState ({
      elapsedTime: 0,
      previousTime: Date.now(),
    })
  }
  render() {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { this.state.running ? 
        <button onClick={this.onStop}>Stop</button> : 
        <button onClick={this.onStart}>Start</button> }
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
}

Stopwatch.propTypes = {
  players: React.PropTypes.array.isRequired,
}

class AddPlayerForm extends React.Component {
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  };
  constructor(props) {
  super(props);
    this.state = {
      name: "",
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onNameChange(e) {
    this.setState({name: e.target.value});
  }
  
  onSubmit(e) {
    e.preventDefault();
  
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  }

  render () {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange} />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    ); 
  }
}

function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player){
    return total + player.score;
  }, 0);
  
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )  
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
};




class Counter extends Header {
  render() {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={function() {this.props.onChange(-1);}.bind(this)} > - </button>
        <div className="counter-score"> {this.props.score} </div>
        <button className="counter-action increment" onClick={function() {this.props.onChange(1);}.bind(this)}> + </button>
      </div>
    );
  }
}
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

class Player extends Application {
  render() {
    return (
      <div className="player">
        <div className="player-name">
          <a className="remove-player" onClick={this.props.onRemove}>✖</a>
          {this.props.name}
        </div>
        <div className="player-score">
          <Counter score={this.props.score} onChange={this.props.onScoreChange} />
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

// class Header extends React.Component {
//   render () {
//     return (
//       <div className="header">
//         <h1>{props.title}</h1>
//       </div>
//     );
//   }
// }


// Application.defaultProps = {
//   title: "Scoreboard",
// };

// Application.propTypes = {
//   title: React.PropTypes.string,
//   initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
//     name: React.PropTypes.string.isRequired,
//     score: React.PropTypes.number.isRequired,
//     id: React.PropTypes.number.isRequired,
//   })).isRequired,
// };

export default Application;
