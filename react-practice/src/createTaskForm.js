import React, { Component } from 'react';
import Client from './Client'


function CreateProjectDisplay(props){
  return(
    <div className="CreateTask">
      <input id="createTaskInput" name="taskDesciption" type="text" placeholder="Enter Task Description ... "
        onChange={props.handleFieldChange}/> <br/>
        Description<br/>

        //dropdown for selecting user story
        Client.getPBIs(this.props.project, (pbis)=>{
        userStory: <select name="userStory" onChange={props.handleInputChange}>
        for(int i=0;int<pbis.length;i++){
          <option value=pbis[i]> pbis[i].description </option>
        }
        </select><br />
      })

      <textarea id="createPercentage" name="percentage" type="number" min="1" max="100" placeholder="Enter Approximate Percentage" onChange={props.handleFieldChange} /> <br/>
      <textarea id="createMember" name="assignedMember" type="text" placeholder="Enter Assigned User" onChange={props.handleFieldChange} /> <br/>
      <button className="leaveTaskFormButton" onClick={props.handleBackButton}>Cancel</button>
      <button className="createTaskButton" onClick={props.handleClick}>Create Project</button>

    </div>
  );
}

class CreateTaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {taskDescription: '', userStory: this.props.userStory, member: '', percentage: '', errorMessage: '', projecMembers: []};
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick(){
    if(this.state.taskDescription.length > 0 && this.state.userStory.length>0){

      Client.getTotalPBIPercentage(this.props.pbi.id, (total)=>{
              Client.addTask(this.props.project, this.props.sprint, this.props.pbi.id,
                this.state.taskTescription, total, this.state.member, 1,1) //just giving 1 for columnNumber and Priority for now
          })
      this.props.handleTaskComplete();
      });
    } else {
      this.setState({errorMessage:'Must fill out project description and select user story!'});
    }
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
