import React, { Component } from 'react';
import Client from './Client'

class RejectUserStoryForm extends Component {

  constructor(props) {
    super(props);
    this.state = {reason: '', errorMessage: ''};
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick(){
    if(this.state.reason === ''){
      this.setState({errorMessage: 'Need to enter a reason!'});
    }else{
      this.props.completeReject(this.props.pbi, this.state.reason);
      this.props.exitReject();
    }
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div className="CreateTask">
        <div id="EditPBIBackground">
          <div id="RejectPBIForm">
            <h2>Reject PBI</h2>
            <font color="red">{this.state.errorMessage}</font>
          <br/>

            Description:<br/>
            {this.props.pbi.description}
            <br/>

            Enter reason for rejecting:
            <input id="createTaskInput" name="reason" type="text" placeholder="Enter Reason ... "
              onChange={this.handleInputChange}/>

              <button className="leaveTaskFormButton" onClick={this.props.exitReject}>Cancel</button>
              <button className="createTaskButton" onClick={this.handleClick}>Reject</button>

          </div>
        </div>
      </div>
    );
  }
}

export default RejectUserStoryForm
