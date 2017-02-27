import React, { Component } from 'react';
import './App.css';
import Client from './Client.js';

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {users:[]};
    this.getUsers = this.getUsers.bind(this); // This is neccessary because
                                              // of how javascript handles "this"
                                              // Every time a function is
                                              // handling an event or being
                                              // passed to the props of a child
                                              // component we need it
  }

  getUsers() {
    Client.getUsers((users) => {
      this.setState({
        users: users,
      });
    });
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    return (
      <center>
      <table>
        <tr>
          <th>Username</th>
          <th>Password</th>
        </tr>
        {this.state.users.map(function(user, i) {
          return (
            <tr>
              <td>{user.username}</td>
              <td>{user.password}</td>
            </tr>
          );
        })}
    </table>
  </center>
    );
  }
}

export default UserTable;
