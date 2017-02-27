import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LogInForm from './LogInForm'
import UserTable from './UserTable'
import AddUserForm from './AddUserForm'
import Client from './Client'

function LogOutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

//ADD COLOR FUNCTIONALITY LATER
function addUser(username,password,color){
  Client.addUser(username,password, function(){});
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false, loggedInUser: '', bannerColor: 'black'};
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogIn(user,color){
    this.setState({isLoggedIn: true, loggedInUser: user, bannerColor: color});
  }

  handleLogOut(){
    this.setState({isLoggedIn: false, loggedInUser: '', bannerColor: 'black'});
  }

  render() {
    var greeting = null;
    var content = null;
    if(this.state.isLoggedIn){
      greeting = 'Welcome ' + this.state.loggedInUser;
      content = <LogOutButton onClick={this.handleLogOut}/>
    } else{
      greeting = 'Please Login...';
      content = <LogInForm getUser={Client.getUser} addUser={addUser} handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn}/>
    }
    return (
      <div className="App">
        <div className={"App-header-" + this.state.bannerColor}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Scrumtious Demo Page</h1>
          <h2>{greeting}</h2>
        </div>
        <br />
        {content}
        <UserTable/>
        <AddUserForm/>
      </div>
    );
  }
}

export default App;
