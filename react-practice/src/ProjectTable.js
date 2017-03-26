import React, { Component } from 'react';
import './App.css';
import Client from './Client.js';

function tableRow(props){
  return(
    <tr onClick={props.fetchProject}><td>{props.username}</td></tr>
  )
}

class ProjectTable extends Component {

  constructor(props, user) {
    super(props);
    this.state = {users:[], projects:[]};
    this.getUsers = this.getUsers.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.fetchProject = this.fetchProject.bind(this);
  }

  getUsers() {
//This needs to get projects, I'm testing it on users currently
    Client.getUsers((users) => {
      this.setState({
        users: users,
      });
    });
  }


    getProjects() {
      Client.getProject((projects) => {
        this.setState({
          projects:projects,
        });
      });
    }


  fetchProject (user) {
    //const user = e.target.getAttribute('data-item');
    console.log('Testing click ',user.username);
    Client.getProjectsByUser(user.username, (projects) => {
      console.log('Projects ',projects[0]);
    });

  }

   componentWillMount() {
     this.getUsers();
   }

  render() {
    var tableBody = [];




  tableBody.push(<tr ><th><font color = "blue">Project</font></th><th><font color = "blue">Description</font></th></tr>);
    for(var i = 0; i < this.state.users.length; i++){
      tableBody.push(<tr onClick={()=>this.fetchProject(this.state.users[i])}>
      <td><font color = "black">{this.state.users[i].username}</font></td>
      <td><font color = "black">{this.state.users[i].password}</font></td></tr>);
/*
      tableBody.push(<tr ><th><font color = "blue">Project</font></th><th><font color = "blue">Description</font></th></tr>);
      for(var i = 0; i < this.state.projects.length; i++){
        tableBody.push(<tr onClick={()=>this.fetchProject(this.state.projects[i])}>
        <td><font color = "black">{this.state.projects[i].projectTitle}</font></td>
        <td><input type="button"  className={"btn for table " + i} value={this.state.projects[i].projectTitle} onClick={()=>this.fetchProject(this.state.projects[i])}/></td>
        <td><font color = "black">{this.state.projects[i].descriptionField}</font></td></tr>);

*/
    }}



render() {
  var tableBody = [];
  /*for(var i = 0; i < this.state.users.length; i++){
    tableBody.push(<tableRow username={this.state.users[i]} fetchProject={this.fetchProject} />);
  }*/
  tableBody.push(<tr ><th><font color = "blue">Project</font></th><th><font color = "blue">Description</font></th></tr>);
    for(var i = 0; i < this.state.users.length; i++){
      tableBody.push(<tr onClick={()=>this.fetchProject(this.state.users[i]}>
      <td><font color = "black">{this.state.users[i].username}</font></td>
      <td><title>{'row'+i}</title><font color = "black">{this.state.users[i].password}</font></td></tr>);}

  return (

    <center>
    <table>

     {tableBody}


    </table>
    </center>
    )}
}

export default ProjectTable;
