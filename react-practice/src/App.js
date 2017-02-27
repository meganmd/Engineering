import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LogInForm from './LogInForm'
import UserTable from './UserTable'

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

  handleLoginClick() {
  //EXAMPLE. We will probably want a different implementation to work with the database
   for(var i = 0; i < this.props.users.length; i++){
     if(this.props.users[i].username === this.state.userfield &&
       this.props.users[i].password === this.state.passwordfield){
       this.setState({loggedInUser: this.state.userfield});
       this.setState({isLoggedIn: true});
       this.setState({errorMessage: ''});
       return;
     }
   }
   this.setState({errorMessage: 'Incorrect Username or Password'})
  }

  handleRegisterClick(){
    //Example. We will probably want a different implementation to work with the database
    for(var i = 0; i < this.props.users.length; i++){
      if(this.props.users[i].username === this.state.userfield){
        this.setState({errorMessage: 'Username already taken'});
        return;
      }
    }
    addUser({username: this.state.userfield, password: this.state.passwordfield});
    this.setState({loggedInUser: this.state.userfield});
    this.setState({isLoggedIn: true});
    this.setState({errorMessage: ''});
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
        <UserTable/>
        <br />
        {content}
      </div>
    );
  }
}

export default App;
