import React, { Component } from 'react';
import App from './App.css';



class ProjectTable extends Component {

  constructor(props) {
    super(props);
    this.fetchProject = this.fetchProject.bind(this);
  }

  fetchProject (project, handleProjectSelected) {
    return function(){
      handleProjectSelected(project);
    }
  }

render() {
  var tableBody = [];
  tableBody.push(
    <tr key={999}>
      <th><font color="blue">Project</font></th>
      <th><font color="blue">Role</font></th>
      <th><font color="blue">Description</font></th>
    </tr>);
    for(var i = 0; i < this.props.projects.length; i++){
      var clicker = this.fetchProject(this.props.projects[i], this.props.handleProjectSelected);
      tableBody.push(
        <tr key={i} onClick={clicker} id="projectTable">
          <td><font color="black">{this.props.projects[i].name}</font></td>
          <td><font color="black">{this.props.projects[i].role}</font></td>
          <td><title>{'row'+i}</title><font color="black">{this.props.projects[i].description}</font></td>
        </tr>);
    }


  return (
    <center>
      Accepted Projects
      <table id="projectTable">
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </center>
    )
}}

export default ProjectTable;
