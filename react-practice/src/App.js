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
import PBIBacklogForm from './PBIBacklogForm'
import CreatePBIForm from './CreatePBIForm'

function LogOutButton(props) {
  return (
    <div>
    <button onClick={props.onClick}>
      Logout
    </button>
    </div>
  );
}

function CreateProjectButton(props) {
  return(
    <div>
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
    this.state = {isLoggedIn: false, loggedInUser: {}, bannerColor: 'black', isCreatingProject: false, currentProject: {},isViewingProject:false};
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.handleProjectComplete = this.handleProjectComplete.bind(this);
    this.handleLeaveCreateProjectForm = this.handleLeaveCreateProjectForm.bind(this);
    this.handleProjectSelected = this.handleProjectSelected.bind(this);
    this.handleLeavePBIBacklogForm = this.handleLeavePBIBacklogForm.bind(this);
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

  handleLeaveCreateProjectForm(){
    this.setState({isCreatingProject: false});
  }

  handleProjectSelected(project){
    this.setState({currentProject:project, isViewingProject:true});
  }

  handleLeavePBIBacklogForm(){
    this.setState({currentProject: {}, isViewingProject:false});
  }

  render() {
    var greeting = null;
    var content = [];

    if(this.state.isLoggedIn){
      if(this.state.isCreatingProject){
        greeting = 'Create Project Form';
        content = <CreateProjectForm user={this.state.loggedInUser}
          handleProjectComplete={this.handleProjectComplete}
          handleLeaveCreateProjectForm={this.handleLeaveCreateProjectForm}/>
      } else if(this.state.isViewingProject){
        content = <PBIBacklogForm project={this.state.currentProject}
          handleLeavePBIBacklogForm={this.handleLeavePBIBacklogForm} />
      }else{
        if(this.state.loggedInUser.firstName == ''){
          greeting = 'Welcome ' + this.state.loggedInUser.username;
        }else{
          greeting = 'Welcome ' + this.state.loggedInUser.firstName + ' ' +
          this.state.loggedInUser.lastName;
        }
        content.push(<div> <LogOutButton onClick={this.handleLogOut} /> <CreateProjectButton createClick={this.handleCreateProject}/> </div>);
        content.push(<ProjectTable user={this.state.loggedInUser} handleProjectSelected={this.handleProjectSelected}/>);
      }
    } else {
      greeting = 'Please Login...';
      content = <LogInForm getUser={Client.getUser} addUser={addUser} handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn}/>
    }
    return (
      <div className="App">
        <div className={"App-header-" + this.state.bannerColor}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Scrumtious Scrum Page</h1>
          <h2>{greeting}</h2>
          <pr> </pr>
        </div>
        <br />
        {content}
        {
        <PBIBacklogForm
          projectName="Greatest Project Ever"
        />
        }
      </div>

    );
  }
}

export default App;
