import React, { Component } from 'react';
import App from './App.css';
import Client from './Client.js';



class InvitedProjectsTableForm extends Component {

  constructor(props) {
    super(props);
    this.state = { projects:[]};
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.rejectInvitation = this.rejectInvitation.bind(this);
  }

  acceptInvitation(project, user){
    return function(){
      console.log("ACCEPT")
      Client.acceptProjectInvitation(user.username, project.name, function(){});
    }
  }

  rejectInvitation(project, user){
    return function(){
      console.log("REJECT" + user.username + project.name);
      Client.rejectProjectInvitation(user.username, project.name, function(){});
    }
  }

  getProjects(){
    Client.getUnacceptedProjectsByUser(this.props.user.username,(projects)=>{
      this.setState({projects:projects})
    });
  }

 componentWillMount() {
   this.getProjects();
 }

render() {
  var tableBody = [];
  tableBody.push(<tr>Project Invitations</tr>)
    tableBody.push(
      <tr >
        <th><font color="blue">Project</font></th>
        <th><font color="blue">Role</font></th>
        <th><font color="blue">Description</font></th>
        <th></th>
      </tr>);
    for(var i = 0; i < this.state.projects.length; i++){
      var accept = this.acceptInvitation(this.state.projects[i], this.props.user);
      var reject = this.rejectInvitation(this.state.projects[i], this.props.user);
      tableBody.push(
        <tr id="projectTable">
          <td><font color="black">{this.state.projects[i].name}</font></td>
          <td><font color="black">{this.state.projects[i].role}</font></td>
          <td><title>{'row'+i}</title><font color="black">{this.state.projects[i].description}</font></td>
          <td>
            <button id="acceptProjectInvitationButton" color="green" onClick={accept}>Accept</button>
            <button id="rejectProjectInvitationButton" color="red" onClick={reject}>Reject</button>
          </td>
        </tr>);

    }


  return (
    <center>
      <table id="projectTable">
        {tableBody}
      </table>
    </center>
    )
}}

export default InvitedProjectsTableForm;
