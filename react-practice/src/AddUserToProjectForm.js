import React, { Component } from 'react';
import Client from './Client'

function AddUserDisplay(props){
  return(
    <div style={props.divStyle}>
      <div id="AddUserForm">
        <div className="CreateProject">
           Username*<br/>
          <input type="text" placeholder="Enter Username ... "
            onChange={props.handleUserNameChange}/> <br/>
          <font color="red">{props.errorMessage}</font> <br/>
          <button onClick={props.handleBackButton}>Cancel</button>
          <button className="inviteUserToProjectButton" onClick={props.handleInviteUserClick}>Invite!</button>
        </div>
      </div>
    </div>
  );
}

class AddUserToProjectForm extends Component {

  constructor(props) {
    super(props);
    this.state = {username: '', errorMessage: '', project: this.props.project};
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleInviteUserClick = this.handleInviteUserClick.bind(this);
    this.divStyle = {
      position: 'absolute',
      left: '0',
      top: '0',
      background: '#555555dd',
      width: '100%',
      height: props.height+100,
    }
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
    Client.getUser(this.state.username, (user) => {
      if(user === null || user.username !== this.state.username){
        this.setState({errorMessage: 'User does not exist'});
        return;
      }
      Client.getUserFromProject(this.state.username, this.state.project, (user) => {
        if (user.username === this.state.username){
          this.setState({errorMessage: 'User already in project'});
          return;
        } else{
          Client.addUserToProject(this.state.username, this.state.project, function(){});
          this.props.handleAddUserComplete();
        }
      });
    })
  }

  render() {
    return (
      <div className="CreateProject">
          <AddUserDisplay
            handleUserNameChange={this.handleUserNameChange}
            handleInviteUserClick={this.handleInviteUserClick}
            errorMessage={this.state.errorMessage}
            handleBackButton={this.props.handleAddUserComplete}
            divStyle={this.divStyle}
          />
      </div>
    );
  }

}

export default AddUserToProjectForm
