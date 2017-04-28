import React, { Component } from 'react';
import './App.css';
import LogInForm from './LogInForm';
import CreateProjectForm from './CreateProjectForm';
import Client from './Client';
import AddUserToProjectForm from './AddUserToProjectForm';
import ProjectBacklog from './ProjectBacklog';
import ViewProjectsForm from './ViewProjectsForm';
import CreateSprint from './CreateSprint';

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
    this.state = {
      isLoggedIn: false,
      loggedInUser: {},
      isCreatingProject: false,
      currentProject: {},
      isViewingProject:false,
      isAddingUser: false,
      isAddingSprint: false};
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.handleProjectComplete = this.handleProjectComplete.bind(this);
    this.handleLeaveCreateProjectForm = this.handleLeaveCreateProjectForm.bind(this);
    this.handleProjectSelected = this.handleProjectSelected.bind(this);
    this.handleLeavePBIBacklogForm = this.handleLeavePBIBacklogForm.bind(this);
    this.openAddUser = this.openAddUser.bind(this);
    this.exitAddUser = this.exitAddUser.bind(this);
    this.openAddSprint = this.openAddSprint.bind(this);
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

  handleProjectComplete(projectTitle){
    console.log('arriving here');
    this.setState({isCreatingProject: false});
    Client.addSprint(projectTitle, 1);
  }

  openAddSprint(project, number){
    //Client.addSprint(project,number, cb );
    this.setState({isAddingSprint:true});
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

  openAddUser(){
    this.setState({addUser:true});
  }

  exitAddUser(){
    this.setState({addUser:false});
  }

  render() {
    var content = [];

    if(this.state.isLoggedIn){
      if(this.state.isCreatingProject){
        content = <CreateProjectForm user={this.state.loggedInUser}
          handleProjectComplete={this.handleProjectComplete}
          handleLeaveCreateProjectForm={this.handleLeaveCreateProjectForm}/>
      } else if(this.state.isViewingProject){
        //The old way of doing things...
        /*
        content.push( <PBIBacklogForm project={this.state.currentProject}
          handleLeavePBIBacklogForm={this.handleLeavePBIBacklogForm} />);
          */
          //The new way of doing things ...
          var top = <h1  id="projectTitleText" key={0}>
            <button className="halfSizeButton" onClick={this.handleLeavePBIBacklogForm}>Back</button>
            {this.state.currentProject.name}
            <button className="halfSizeButton" onClick={this.openAddUser}>Add User</button>
            <button className="halfSizeButton" onClick={this.openAddSprint}>Create Sprint</button>
          </h1>
          content.push(top);
          content.push(<ProjectBacklog project={this.state.currentProject} key={1}/>);
      }else{
        top = <h1  id="projectTitleText" key={0}>
                      <LogOutButton onClick={this.handleLogOut} />
                      {this.state.loggedInUser.firstName + " " + this.state.loggedInUser.lastName}
                     <CreateProjectButton createClick={this.handleCreateProject}
                     />
                   </h1>
        content.push(top);
        var viewProjects = <div key={1}><ViewProjectsForm user={this.state.loggedInUser}
           handleProjectSelected={this.handleProjectSelected}/></div>
        content.push(viewProjects);
      }
    } else {
      content = <LogInForm getUser={Client.getUser} addUser={addUser} handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn}/>;
    }

    if(this.state.addUser){
      content.push(<div><AddUserToProjectForm project={this.state.currentProject.name}
        handleAddUserComplete={this.exitAddUser}/></div>);
        //add in board height here/>
    }

/*
    if(this.state.isAddingSprint){
      console.log("ERROR Adding");
      content.push(<CreateSprint close={this.closeAddSprint}/>);
    }
    */

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
