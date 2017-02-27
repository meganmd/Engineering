import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LogInForm from './LogInForm'

function addUser(user){
  users.push(user)
}

var users = [
  {username: 'adam', password: 'password'},
  {username: 'noah', password: 'otherPassword'}
];

function LogOutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false, loggedInUser: ''};
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogIn(user){
    this.setState({isLoggedIn: true, loggedInUser: user});
  }

  handleLogOut(){
    this.setState({isLoggedIn: false, loggedInUser: ''});
  }

  render() {
    var greeting = null;
    var content = null;
    if(this.state.isLoggedIn){
      greeting = 'Welcome ' + this.state.loggedInUser;
      content = <LogOutButton />
    } else{
      greeting = 'Please Login...';
      content = <LogInForm users={users} handleAddUser={this.addUser} handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn}/>
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Scrumptious Demo Page</h1>
          <h2>{greeting}</h2>
        </div>
        <br />
        {content}
      </div>
    );
  }
}

export default App;
