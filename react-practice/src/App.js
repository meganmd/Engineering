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
import InvitedProjectsTableForm from './InvitedProjectsTableForm'

function LogOutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

function CreateProjectButton(props) {
  return(
      <button onClick={props.createClick}>
        Create Project
      </button>
  );
}


function addUser(username,password,firstName,lastName){
  Client.addUser(username,password,firstName, lastName, function(){});
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false, loggedInUser: {}, isCreatingProject: false, currentProject: {},isViewingProject:false};
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
        content.push( <PBIBacklogForm project={this.state.currentProject}
          handleLeavePBIBacklogForm={this.handleLeavePBIBacklogForm} />);
      }else{
        var top = <h1  id="projectTitleText">
                      <LogOutButton onClick={this.handleLogOut} />
                      {this.state.loggedInUser.firstName + " " + this.state.loggedInUser.lastName}
                     <CreateProjectButton createClick={this.handleCreateProject}/>
                   </h1>
        content.push(top);
        var projectTable = <div id="projectHome">
                              <ProjectTable user={this.state.loggedInUser} handleProjectSelected={this.handleProjectSelected}/>
                          </div>
        content.push(projectTable);
        var invitedTable = <div id="invitedProjects">
          <InvitedProjectsTableForm user={this.state.loggedInUser} />
        </div>
        content.push(invitedTable);
      }
    } else {
      greeting = 'Please Login...';
      content = <LogInForm getUser={Client.getUser} addUser={addUser} handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn}/>;
    }
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}
/*
{content}
*/
//
export default App;
