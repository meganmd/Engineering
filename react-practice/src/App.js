import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

function RegisterButton(props){
  return(
  <button onClick={props.onClick}>
    Register
  </button>
  )
}

function LogInForm(props){
  return(
    <div>
      <input type="text" placeholder="Enter Username..."
        onChange={props.handleUserChange}/><br />
      <input type="text" placeholder="Enter Password..." onChange={props.handlePasswordChange} /> <br />
      <LoginButton onClick={props.handleLoginClick} />
      <RegisterButton onClick={props.handleRegisterClick} />
      <br/>
      <font color="red">{props.errorMessage}</font>
    </div>
  );
}

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false, loggedInUser: '', userfield: '', passwordfield: '', errorMessage: ''};
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }

  handleLoginClick() {
  //EXAMPLE. We will probably want a different implementation to work with the database
   for(var i = 0; i < this.props.users.length; i++){
     if(this.props.users[i].username == this.state.userfield &&
       this.props.users[i].password == this.state.passwordfield){
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
      if(this.props.users[i].username == this.state.userfield){
        this.setState({errorMessage: 'Username already taken'});
        return;
      }
    }
    addUser({username: this.state.userfield, password: this.state.passwordfield});
    this.setState({loggedInUser: this.state.userfield});
    this.setState({isLoggedIn: true});
    this.setState({errorMessage: ''});
  }

  handleUserChange(e){
    this.setState({userfield: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({passwordfield: e.target.value});
  }

  handleLogoutClick(){
    this.setState({loggedInUser: '', isLoggedIn: false})
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    var display = null;
    if (isLoggedIn) {
      display = <LogoutButton onClick={this.handleLogoutClick}/>
    } else {
      display = <LogInForm handleUserChange={this.handleUserChange} handlePasswordChange={this.handlePasswordChange}
        handleLoginClick={this.handleLoginClick} handleRegisterClick={this.handleRegisterClick} errorMessage={this.state.errorMessage}/>
    }
    return (
      <div>
          {display}
      </div>
    )
  }
}

function addUser(user){
  users.push(user)
}

var users = [
  {username: 'adam', password: 'password'},
  {username: 'noah', password: 'otherPassword'}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>LogIn page</h2>
        </div>
        <br />
        <LoginControl users={users} handleAddUser={this.addUser}/>
      </div>
    );
  }
}

export default App;
