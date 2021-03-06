import React, { Component } from 'react';
import App from './App.css';



class InvitedProjectsTableForm extends Component {

render() {
  var tableBody = [];
    tableBody.push(
      <tr key={999}>
        <th><font color="blue">Project</font></th>
        <th><font color="blue">Role</font></th>
        <th><font color="blue">Description</font></th>
        <th></th>
      </tr>);
    for(var i = 0; i < this.props.projects.length; i++){
      var accept = this.props.accept(this.props.projects[i], this.props.user, this.props.updateTables);
      var reject = this.props.reject(this.props.projects[i], this.props.user, this.props.updateTables);
      tableBody.push(
        <tr key={i} id="projectTable">
          <td><font color="black">{this.props.projects[i].name}</font></td>
          <td><font color="black">{this.props.projects[i].role}</font></td>
          <td><title>{'row'+i}</title><font color="black">{this.props.projects[i].description}</font></td>
          <td>
            <button id="acceptProjectInvitationButton" color="green" onClick={accept}>Accept</button>
            <button id="rejectProjectInvitationButton" color="red" onClick={reject}>Reject</button>
          </td>
        </tr>);
    }


  return (
    <center>
      Project Invitations
      <table id="projectTable">
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </center>
    )
}}

export default InvitedProjectsTableForm;
