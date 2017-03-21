import React, { Component } from 'react';
import Client from './Client'

function AddUserDisplay(props){
  return(
    <div className="CreateProject">
       Username*<br/>
      <input type="text" placeholder="Enter Username ... "
        onChange={props.handleProjectNameChange}/> <br/>
      <font color="red">{props.errorMessage}</font> <br/>
      <button onClick={props.handleInviteUserClick}>Invite!</button>
    </div>
  );
}

class AddUserToProjectForm extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', errorMessage: ''};
    this.handleUsernameChange = this.handleUserNameChange.bind(this);
    this.handleInviteUserClick = this.handleInviteUserClick.bind(this);
  }

  handleUserNameChange(e){
    this.setState({username: e.target.value});
  }

  handleInviteUserClick(){
    console.log("handling the user click");
    if(this.state.username.length === 0){
      this.setState({errorMessage: 'Please enter in a user to invite'});
      return;
    }
    //add the database call here to find users associated with a project
    this.props.exit();
  }

  render() {
    return (
      <div className="CreateProject">
          <AddUserDisplay
            handleUserNameChange={this.handleUserNameChange}
            handleInviteUserClick={this.handleInviteUserClick}
            errorMessage={this.state.errorMessage}
          />
      </div>
    );
  }

}

export default AddUserToProjectForm
