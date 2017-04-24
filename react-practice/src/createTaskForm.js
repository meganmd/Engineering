import React, { Component } from 'react';
import Client from './Client'


function CreateProjectDisplay(props){

  var dropdown = [];

  //dropdown for selecting user story
  Client.getPBIs(this.props.project, (pbis)=>{
    dropdown.push(userStory: <select name="userStory" onChange={props.handleInputChange}>);
    for(int i=0;int<pbis.length;i++){
      dropdown.push(<option value=pbis[i]> pbis[i].description </option>);
    }
    dropdown.push(</select><br />);
  })

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
