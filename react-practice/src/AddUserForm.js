import React, { Component } from 'react';
import './App.css';
import Client from './Client.js';

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {username : "hello", password : "world"};
    this.handleUsernameChange = this.handleUsernameChange.bind(this); //neccessary because of js "this"
    this.handlePasswordChange = this.handlePasswordChange.bind(this); //anytime function is listening to an event
    this.addUser = this.addUser.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username : event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password : event.target.value});
  }

  addUser() {
    Client.addUser(this.state.username, this.state.password, function(){});
    this.props.updateUsers();
  }


  render() {
    return (
      <div className="AddUserCard">
        <div>
          Username:
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button onClick={this.addUser}>Add</button>
        </div>
      </div>
    );
  }
}

export default AddUserForm;
