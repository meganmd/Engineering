import React, { Component } from 'react';
import Client from './Client';

function EditTaskDisplay(props){

  var dropdown = [];

  //dropdown for selecting user story
  for(var i=0;i<props.pbis.length;i++){
    dropdown.push(<option key={i} value={i} className={props.pbis[i].description}> {props.pbis[i].description} </option>);
  }

  var members = [];
  members.push(<option key={-1} value={-1} className="unselected"> -unselected- </option>)
  for(var i=0; i<props.members.length;i++){
    members.push(<option key={i} value={i} className={props.members[i].username}> {props.members[i].username} </option>);
  }

  return(
    <div id="EditPBIBackground">
      <div id="EditTaskForm">
        <div className="CreateTask">
          <h2  id="taskText">
            Edit Task <br/>
            <button className="deleteTaskButton" color="red" onClick={props.deleteTask}>Delete</button>
          </h2>

          Description<br/>
          <input id="createTaskInput" name="taskDescription"
            type="text" value={props.defaultDescription}
            placeholder="Enter Task Description ... "
            onChange={props.handleFieldChange}/> <br/>

          Select User Story:<br/>
          <select name="userStory" value={props.defaultPBI}
            onChange={props.handleSelectUserStory}>

            {dropdown}
          </select>
          <br/>
          <br/>

          Percentage:<br/>
          <input id="createPercentage" value={props.defaultPercent}
            name="percentage" type="number" min="0" max="100"
            placeholder="Enter Approximate Percentage"
            onChange={props.handleFieldChange} /> <br/>
          <br/>

          Assign Member:<br/>
          <select name="assignedMember" id="createMember"
            value={props.defaultMember} onChange={props.handleSelectMember}>
            {members}
          </select>
          <br/>

          <font color="red">{props.errorMessage}</font><br/>

          <button className="leaveTaskFormButton" onClick={props.handleBackButton}>Cancel</button>

          <button className="createTaskButton" onClick={props.handleClick}>Edit Task</button>

        </div>
      </div>
    </div>
  );
}

class EditTaskForm extends Component {

  constructor(props) {
    super(props);
    var defaultPBI = "";
    for(var i=0;i<props.pbis.length;i++){
      if(props.pbis[i].id === props.task.pbi){
        defaultPBI = i;
        break;
      }
    }

    var defaultMember = "";
    if(props.task.member === "unselected"){
      defaultMember = -1;
    } else{
      for(var i=0;i<props.members.length;i++){
        if(props.members[i].username === props.task.member){
          defaultMember = i;
          break;
        }
      }
    }

    this.state = {
      taskDescription: this.props.task.description,
      userStory: this.props.task.pbi,
      assignedMember: this.props.task.member,
      percentage: this.props.task.percent,
      errorMessage: '',
      defaultPBIDescription: defaultPBI,
      defaultMember: defaultMember,
      oldPercentage: this.props.task.percent};
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectMember = this.handleSelectMember.bind(this);
    this.handleSelectUserStory = this.handleSelectUserStory.bind(this);
  }

  handleClick(){
    // console.log("CLICK");
    if(this.state.taskDescription.length > 0){
      if(this.props.task.columnNumber !== 1 && (this.state.assignedMember === "unselected" || !(this.state.percentage > 0))){
        this.setState({errorMessage: 'Tasks in progress or done must have be given a percentage and assigned member'})
      } else{
        // console.log("ID: " + this.state.userStory)
        Client.getTotalPBIPercentage(this.state.userStory, this.props.sprint, (total)=>{
            console.log("TOTAL: " + total)
              if(this.state.percentage+total-this.state.oldPercentage<=100 && this.state.percentage>=0){
                Client.editTask(
                  this.props.task.id,
                  this.state.taskDescription,
                  this.state.percentage,
                  this.state.assignedMember,
                  this.state.userStory,
                  function(){}) //just giving 1 for columnNumber and Priority for now
                this.props.handleEditTaskComplete();
              }else{
                    this.setState({errorMessage:'Percentage cannot be over 100%!'});
              }
        });
      }
    } else {
      this.setState({errorMessage:'Must fill out project description!'});
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
    console.log("VAL " + event.target.value);
    if(event.target.value < 0){
      this.setState({assignedMember: "unselected", defaultMember: event.target.value});
    } else{
      this.setState({assignedMember: this.props.members[event.target.value].username, defaultMember: event.target.value});
    }
  }

  handleSelectUserStory(event){
    this.setState({userStory: this.props.pbis[event.target.value].id, defaultPBIDescription: event.target.value});
  }

  render() {
    return (
      <div className="CreateTask">

          <EditTaskDisplay
            handleClick={this.handleClick}
            handleBackButton={this.props.exit}
            errorMessage={this.state.errorMessage}
            handleFieldChange={this.handleInputChange}
            pbis={this.props.pbis}
            members={this.props.members}
            handleSelectMember={this.handleSelectMember}
            handleSelectUserStory={this.handleSelectUserStory}
            task={this.props.task}
            deleteTask={this.props.handleDeleteTask}
            defaultPercent={this.state.percentage}
            defaultDescription={this.state.taskDescription}
            defaultMember={this.state.defaultMember}
            defaultPBI={this.state.defaultPBIDescription}
          />
      </div>
    );
  }
}

export default EditTaskForm
