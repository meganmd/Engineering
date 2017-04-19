import React, { Component } from 'react';
import App from './App.css';
import Client from './Client.js';
import ProjectTable from './ProjectTable.js';
import InvitedProjectsTableForm from './InvitedProjectsTableForm';


class ViewProjectsForm extends Component {

  constructor(props) {
    super(props);
    this.state = { acceptedProjects:[], unacceptedProjects:[] };
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.rejectInvitation = this.rejectInvitation.bind(this);
    this.getAcceptedProjects = this.getAcceptedProjects.bind(this);
    this.getUnacceptedProjects = this.getUnacceptedProjects.bind(this);
    this.updateTables = this.updateTables.bind(this);
  }

  getAcceptedProjects(){
    Client.getAcceptedProjectsByUser(this.props.user.username,(projects)=>{
      this.setState({acceptedProjects:projects})
    });
  }

  getUnacceptedProjects(){
    Client.getUnacceptedProjectsByUser(this.props.user.username,(projects)=>{
      this.setState({unacceptedProjects:projects})
    });
  }

  componentWillMount() {
    this.getAcceptedProjects();
    this.getUnacceptedProjects();
  }

  updateTables(){
    this.getAcceptedProjects();
    this.getUnacceptedProjects();
  }

  acceptInvitation(project, user, updateTables){
    return function(){
      //console.log("ACCEPT")
      Client.acceptProjectInvitation(user.username, project.name, function(){});
      updateTables();
    }
  }

  rejectInvitation(project, user, updateTables){
    return function(){
      //console.log("REJECT" + user.username + project.name);
      Client.rejectProjectInvitation(user.username, project.name, function(){});
      updateTables();
    }
  }

  render(){
    return(
      <div>
        <div id="projectHome">
          <ProjectTable projects={this.state.acceptedProjects}
            handleProjectSelected={this.props.handleProjectSelected}/>
        </div>
        <div id="invitedProjects">
          <InvitedProjectsTableForm user={this.props.user}
            projects={this.state.unacceptedProjects}
            accept={this.acceptInvitation}
            reject={this.rejectInvitation}
            updateTables={this.updateTables}/>
        </div>
      </div>
    )
  }
}

export default ViewProjectsForm;
