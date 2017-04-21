import React, { Component } from 'react';
import Client from './Client'


function CreateProjectDisplay(props){
  return(
    <div className="CreateTask">
      <input id="createTaskInput" name="taskDesciption" type="text" placeholder="Enter Task Description ... "
        onChange={props.handleFieldChange}/> <br/>
        Description<br/>
      <textarea id="createUserStory" name="userStory" type="text" placeholder="Enter User Story" onChange={props.handleFieldChange} /> <br/>
      <textarea id="createPercentage" name="percentage" type="text" placeholder="Enter Approximate Percentage" onChange={props.handleFieldChange} /> <br/>
      <textarea id="createMember" name="assignedMember" type="text" placeholder="Enter Assigned User" onChange={props.handleFieldChange} /> <br/>
      <button className="leaveTaskFormButton" onClick={props.handleBackButton}>Cancel</button>
      <button className="createTaskButton" onClick={props.handleClick}>Create Project</button>
    </div>
  );
}

class CreateTaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {taskDescription '', userStory: '', member: '', percentage: '', errorMessage: ''};
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick(){
    if(this.state.taskDescription.length > 0 && this.state.userStory.length>0){ //need to check user story exists

      Client.addTask(project, sprint, pbi, description, percentage, member, columnNumber, priority) //how do these work?
      this.props.handleProjectComplete();
      });
    } else {
      this.setState({errorMessage:'Must fill out project description and user story!'});
    }
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleTaskDescriptionChange(e){
    this.setState({taskDescription: e.target.value});
  }

  handleUserStoryChange(e){
    this.setState({userStory: e.target.value});
  }

  handleUserPercentageChange(e){
    this.setState({percentage: e.target.value});
  }

  handleAssignedMemberChange(e){
    this.setState({member: e.target.value});
  }

  render() {
    return (
      <div className="CreateTask">
      <h1  id="taskText">
        Create Task
      </h1>
          <CreateProjectDisplay
            handleClick={this.handleClick}
            handleBackButton={this.props.handleLeaveCreateProjectForm}
            errorMessage={this.state.errorMessage}
            handleFieldChange={this.handleInputChange}
          />
      </div>
    );
  }
}

export default CreateTaskForm
