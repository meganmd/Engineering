import React, { Component } from 'react';
import App from './App.css';
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

  getCurrentProject(){
return "testing it out";

  }


    getProjects() {
      Client.getProject((projects) => {
        this.setState({
          projects:projects,
        });
      });
    }

  getUserProjects() {
    Client.getProjectsByUser(this.props.user.username, (projects) => {
      this.setState({
        projects: projects,
      });
    });
  }


  fetchProject(event) {
    //const user = e.target.getAttribute('data-item');
    console.log('fetching project ', event.target.name);
    this.props.selectProject(event.target.name);
  }

   componentWillMount() {
     this.getUserProjects();
   }

render() {
  var tableBody = [];
  /*for(var i = 0; i < this.state.users.length; i++){
    tableBody.push(<tableRow username={this.state.users[i]} fetchProject={this.fetchProject} />);
  }*/


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
      <td><title>{'row'+i}</title><font color = "black">{this.state.users[i].password}</font></td></tr>);}
*/

  return (
    <center>
    <table>
     {tableBody}
    </table>
    </center>
    )}
}

export default ProjectTable;
