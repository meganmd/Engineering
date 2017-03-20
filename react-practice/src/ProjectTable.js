import React, { Component } from 'react';
import './App.css';
import Client from './Client.js';


class ProjectTable extends Component {

  constructor(props, user) {
    super(props);
    this.state = {users:[]};
    this.getUsers = this.getUsers.bind(this);
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

  fetchProject () {
    //const user = e.target.getAttribute('data-item');
    console.log('Testing click ');
  }

   componentWillMount() {
     this.getUsers();
   }

render() {
  var tableBody = [];
  for(var i = 0; i < this.state.users.length; i++){
    tableBody.push(<tr onClick={this.fetchProject}><td>{this.state.users[i].username}</td></tr>);
  }

  return (
    <center>
    <table>
      {tableBody}
    </table>
    </center>
    )}
}

export default ProjectTable;
