import React, { Component } from 'react';
import Client from './Client'

function AddUserDisplay(props){
      //console.log((props.divStyle.height +100) + "secondary");
  return(
    <div style={props.divStyle}>
      <div id="AddUserForm">
        <div className="CreateProject">
           Username*<br/>
          <input name="username" type="text" placeholder="Enter Username ... "
            onChange={props.handleChange}/> <br/>
          <select name="role" value={props.role} onChange={props.handleChange}>
            <option value="development team member">development team member</option>
            <option value="product owner">product owner</option>
          </select>
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
    this.state = {username: '', errorMessage: '', project: this.props.project, role: 'development team member'};
    this.handleChange = this.handleChange.bind(this);
    this.handleInviteUserClick = this.handleInviteUserClick.bind(this);
    var height = parseInt(props.height) + 125;
        //console.log(height + "initial");
    this.divStyle = {
      position: 'absolute',
      left: '0',
      top: '0',
      background: '#555555dd',
      width: '100%',
      'height': height,
    }
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleInviteUserClick(){
    //console.log("handling the user click");
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
          Client.addUserToProject(this.state.username, this.state.project, this.state.role, function(){});
          this.props.handleAddUserComplete();
        }
      });
    })
  }

  render() {
    return (
      <div className="CreateProject">
          <AddUserDisplay
            handleChange={this.handleChange}
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
