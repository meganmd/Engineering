import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LogInForm from './LogInForm';
import UserTable from './UserTable';
import CreateProjectForm from './CreateProjectForm';
import AddUserForm from './AddUserForm';
import Client from './Client';
import s from './index.css';
import AddUserToProjectForm from './AddUserToProjectForm'
import ProjectTable from './ProjectTable.js'

function LogOutButton(props) {
  return (
    <div>
    <button onClick={props.onClick}>
      Logout
    </button>
    <button onClick={props.createClick}>
      Create Project
    </button>
    </div>
  );
}


function addUser(username,password,firstName,lastName){
  Client.addUser(username,password,firstName, lastName, function(){});
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false, loggedInUser: '', bannerColor: 'black', isCreatingProject: false};
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.handleProjectComplete = this.handleProjectComplete.bind(this);
  }

  handleLogIn(user){
    this.setState({isLoggedIn: true, loggedInUser: user});
  }

  handleLogOut(){
    this.setState({isLoggedIn: false, loggedInUser: ''});
  }

  handleCreateProject(){
    this.setState({isCreatingProject: true});
  }

  handleProjectComplete(){
    console.log('arriving here');
    this.setState({isCreatingProject: false});
  }

  render() {
    var greeting = null;
    var content = null;
    if(this.state.isLoggedIn){
      if(this.state.isCreatingProject){
        greeting = 'Create Project Form';
        content = <CreateProjectForm handleProjectComplete={this.handleProjectComplete}/>
      }else{
        greeting = 'Welcome ' + this.state.loggedInUser;
        content = <LogOutButton onClick={this.handleLogOut} createClick={this.handleCreateProject}/>
      }
    }else{
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
        <ProjectTable/>
      </div>
    );
  }
}

export default App;
