import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p> Username: <input type="text"></input></p>
        <p> Password: <input type="text"></input></p>
        <input type="submit"></input>
        <p> Adam Was here </p>
      </div>
    );
    var h1 = <h1>Hello!!</h1>;
  }
}

export default App;
