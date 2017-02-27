import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase";


class App extends Component {
  render() {
    console.log("point 1");
    var firebase = require("firebase");

    var config = {
      apiKey: "AIzaSyBp3-GMOMBN3wvFt6JGCyA9ual2E5A0qy0",
      authDomain: "scrumdemo-4203b.firebaseapp.com",
      databaseURL: "https://scrumdemo-4203b.firebaseio.com",
      storageBucket: "scrumdemo-4203b.appspot.com",
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    database.ref('tyler').set({
    username: 'ty',
    email: 'ttt',
    profile_picture : 'tttt'
  });

        console.log("point 2");
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
        <p> Noah also stopped by </p>
      </div>
    );
  }
}

export default App;
