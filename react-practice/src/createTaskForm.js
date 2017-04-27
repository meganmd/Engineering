import React, { Component } from 'react';
import Client from './Client'


function CreateTaskDisplay(props){

  var dropdown = [];

  //dropdown for selecting user story
  for(var i=0;i<props.pbis.length;i++){
    dropdown.push(<option key={i} value={i}> {props.pbis[i].description} </option>);
  }

  var members = [];
  for(var i=0; i<props.members.length;i++){
    members.push(<option key={i} value={i}> {props.members[i].username} </option>);
  }

  return(
    <div id="EditPBIBackground">
      <div id="CreateTaskForm">
        <div className="CreateTask">
          <h1  id="taskText">
            Create Task
          </h1>

          <font color="red">{props.errorMessage}</font><br/>

          Description<br/>
          <input id="createTaskInput" name="taskDescription" type="text" placeholder="Enter Task Description ... "
            onChange={props.handleFieldChange}/> <br/>

          Select User Story:<br/>
          <select name="userStory" onChange={props.handleSelectUserStory}>
            {dropdown}
          </select>
          <br/>
          <br/>

          Percentage:<br/>
          <input id="createPercentage" name="percentage" type="number" min="0" max="100" placeholder="Enter Approximate Percentage" onChange={props.handleFieldChange} /> <br/>
          <br/>

          Assign Member:<br/>
          <select name="assignedMember" id="createMember" onChange={props.handleSelectMember}>
            {members}
          </select>
          <br/>

          <button className="leaveTaskFormButton" onClick={props.handleBackButton}>Cancel</button>
          <button className="createTaskButton" onClick={props.handleClick}>Create Task</button>

        </div>
      </div>
    </div>
  );
}

class CreateTaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {taskDescription: '', userStory: this.props.pbis[0], assignedMember: this.props.members[0], percentage: 0, errorMessage: ''};
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectMember = this.handleSelectMember.bind(this);
    this.handleSelectUserStory = this.handleSelectUserStory.bind(this);
  }

  handleClick(){
    if(this.state.taskDescription.length > 0 && this.state.userStory.username !== ''){
      // console.log("ID: " + this.state.userStory.id)
      Client.getTotalPBIPercentage(this.state.userStory.id, (total)=>{

            if(this.state.percentage+total<=100){

              Client.addTask(
                this.props.project.name,
                this.props.sprint,
                this.state.userStory.id,
                this.state.taskDescription,
                this.state.percentage,
                this.state.assignedMember.username,
                1,
                this.props.placeRow,
                function(){}) //just giving 1 for columnNumber and Priority for now
              this.props.handleTaskComplete();

            }else{
                  this.setState({errorMessage:'Percentage cannot be over 100%!'});
            }
      });
    } else {
      this.setState({errorMessage:'Must fill out project description and select user story!'});
    }
  }

  handleInputChange(event) {
    if(event.target.name == "percentage"){
      this.setState({[event.target.name]: parseInt(event.target.value)});
    } else{
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleSelectMember(event){
    this.setState({assignedMember: this.props.members[event.target.value]});
  }

  handleSelectUserStory(event){
    this.setState({userStory: this.props.pbis[event.target.value]});
  }

  render() {
    return (
      <div className="CreateTask">

          <CreateTaskDisplay
            handleClick={this.handleClick}
            handleBackButton={this.props.exit}
            errorMessage={this.state.errorMessage}
            handleFieldChange={this.handleInputChange}
            pbis={this.props.pbis}
            members={this.props.members}
            handleSelectMember={this.handleSelectMember}
            handleSelectUserStory={this.handleSelectUserStory}
          />
      </div>
    );
  }
}

export default CreateTaskForm
