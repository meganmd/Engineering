import React, { Component } from 'react';
import App from './App.css';
import Client from './Client.js';



class ProjectTable extends Component {

  constructor(props) {
    super(props);
    this.state = { projects:[]};
    this.fetchProject = this.fetchProject.bind(this);

  }



  fetchProject (project, handleProjectSelected) {
    return function(){
      console.log('Testing click ',project.name);
      handleProjectSelected(project);
    }
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
      var clicker = this.fetchProject(this.state.projects[i], this.props.handleProjectSelected);
      tableBody.push(<tr onClick={clicker} id="projectTable">
      <td><font color = "black">{this.state.projects[i].name}</font></td>
      <td><title>{'row'+i}</title><font color = "black">{this.state.projects[i].description}</font></td></tr>);}


/*

        tableBody.push(<tr><th>Select</th><th><font color = "blue">Project</font></th><th><font color = "blue">Description</font></th></tr>);
        for(var i = 0; i < this.state.projects.length; i++){
          //tableBody.push(<tr onClick={this.fetchProject(this.state.projects[i].name)}>
          tableBody.push(<tr key={i}>
            <td><button onClick={this.fetchProject} name={this.state.projects[i].name}/></td>
            <td><font color = "black">{this.state.projects[i].name}</font></td>
            <td>
              <font color = "black">{this.state.projects[i].description}</font>
            </td>
          </tr>
          );
        }

/*
  tableBody.push(<tr ><th><font color = "blue">Project</font></th><th><font color = "blue">Description</font></th></tr>);
    for(var i = 0; i < this.state.users.length; i++){
      var clicker = this.fetchProject(this.state.users[i]);
      tableBody.push(<tr onClick={clicker}>
      <td><font color = "black">{this.state.users[i].username}</font></td>

      <td><title>{'row'+i}</title><font color = "black">{this.state.users[i].password}</font></td></tr>);}*/

  return (
    <center>
      <table id="projectTable">
        {tableBody}
      </table>
    </center>
    )
}}

export default ProjectTable;
