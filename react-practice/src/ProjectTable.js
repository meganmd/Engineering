import React, { Component } from 'react';
import App from './App.css';
import Client from './Client.js';



class ProjectTable extends Component {

  constructor(props) {
    super(props);
    this.state = { projects:[]};
    this.fetchProject = this.fetchProject.bind(this);

  }



  fetchProject (project) {
    return function(){console.log('Testing click ',project.projectTitle);
    this.props.handleProjectSelected(project);}


  }

getProjects(){

Client.getProjectsByUser(this.props.user.username,(projects)=>{
  this.setState({projects:projects})
});

}

   componentWillMount() {
     this.getProjects();
   }

render() {
  var tableBody = [];



    tableBody.push(<tr ><th><font color = "blue">Project</font></th><th><font color = "blue">Description</font></th></tr>);
    for(var i = 0; i < this.state.projects.length; i++){
      var clicker = this.fetchProject(this.state.projects[i]);
      tableBody.push(<tr onClick={clicker}>
      <td><font color = "black">{this.state.projects[i].projectTitle}</font></td>
      <td><title>{'row'+i}</title><font color = "black">{this.state.projects[i].descriptionField}</font></td></tr>);}




/*

  tableBody.push(<tr ><th><font color = "blue">Project</font></th><th><font color = "blue">Description</font></th></tr>);
    for(var i = 0; i < this.state.users.length; i++){
      var clicker = this.fetchProject(this.state.users[i]);
      tableBody.push(<tr onClick={clicker}>
      <td><font color = "black">{this.state.users[i].username}</font></td>
      <td><title>{'row'+i}</title><font color = "black">{this.state.users[i].password}</font></td></tr>);}*/

  return (




    <center>
<table>
    {tableBody}
   </table>


    </center>
    )
}}

export default ProjectTable;
