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
  return (
    <center>
    <table>
      <tr>
        <td>Username</td>
        <td>Password</td>

      </tr>
      {this.state.users.map(function(user, i) {
        return (



   <tr onClick={this.fetchProject}>
       <td data-title="Username">{user.username}</td>
       <td data-title="Password">{user.password}</td>

   </tr>


            );}
        )

      }
      </table>
    </center>
    )}



}

export default ProjectTable;
