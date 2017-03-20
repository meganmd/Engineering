import React, { Component } from 'react';
import Client from './Client'

function AddUserDisplay(props){
  return(
    <div className="CreateProject">
       Username*<br/>
      <input type="text" placeholder="Enter Username ... "
        onChange={props.handleProjectNameChange}/> <br/>
      <br/> <font color="red">{props.errorMessage}</font>
      <button onClick={props.handleInviteUserClick}>Invite!</button>
    </div>
  );
}

class AddUserToProjectForm extends Component {

  constructor(props) {
    super(props);
    this.state = {username: ''};
    this.handleUsernameChange = this.handleUserNameChange.bind(this);
    this.handleInviteUserClick = this.handleInviteUserClick.bind(this);
  }

  handleUserNameChange(e){
    this.setState({username: e.target.value});
  }

  handleInviteUserClick(){
    console.log("handling the user click");
    //add the database call here!
    this.props.exit();
  }

  render() {
    return (
      <div className="CreateProject">
          <AddUserDisplay
            handleUserNameChange={this.handleUserNameChange}
            handleInviteUserClick={this.handleInviteUserClick}
          />
      </div>
    );
  }

}

export default AddUserToProjectForm
