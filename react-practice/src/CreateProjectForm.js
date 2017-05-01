import React, { Component } from 'react';
import Client from './Client'


function CreateProjectDisplay(props){
  return(
    <div className="CreateProjectBackground">
      Project Name* <font color="red">{props.errorMessage}</font><br/><br/>
      <input id="createProjInput" name="projectTitle" type="text" placeholder="Enter Project Name ... "
        onChange={props.handleFieldChange}/> <br/>
        Description<br/>
      <textarea id="createProjInput" name="descriptionField" cols="40" rows="2" type="text" placeholder="Enter Project Description ..." onChange={props.handleFieldChange} /> <br/>
      <button className="leaveProjectFormButton" onClick={props.handleBackButton}>Cancel</button>
      <button className="createProjectButton" onClick={props.handleClick}>Create Project</button>
    </div>
  );
}


class CreateProjectForm extends Component {

  constructor(props) {
    super(props);
    this.state = {projectTitle: '', descriptionField: '', errorMessage: ''};
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick(){
    if(this.state.projectTitle.length > 0){
      Client.getProject(this.state.projectTitle,(project) => {
        if (project.name === this.state.projectTitle){
          this.setState({errorMessage: 'Project name already taken'});
          return;
        } else{
          Client.addProject(this.state.projectTitle, this.state.descriptionField, () => {
            Client.addUserToProject(this.props.user.username, this.state.projectTitle, "development team member" , () => {
              Client.acceptProjectInvitation(this.props.user.username, this.state.projectTitle, () => {
                  this.props.handleProjectComplete(this.state.projectTitle);
              });
            });
          });
        }
      });
    } else {
      this.setState({errorMessage:'Project name cannot be empty!'});
    }
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleProjectNameChange(e){
    this.setState({projectTitle: e.target.value});
  }

  handleDescriptionChange(e){
    this.setState({descriptionField: e.target.value});
  }

  render() {
    return (
      <div className="CreateProject">
        <h1  id="projectTitleText">
          Create Project
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

export default CreateProjectForm
