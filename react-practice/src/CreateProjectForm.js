import React, { Component } from 'react';
import Client from './Client'


function CreateProjectDisplay(props){
  return(
    <div className="CreateProject">
      Project Name* <font color="red">{props.errorMessage}</font><br/><br/>
      <input name="projectTitle" type="text" placeholder="Enter Project Name ... "
        onChange={props.handleFieldChange}/> <br/>
        Description<br/>
      <textarea name="descriptionField" align="bottom" cols="40" rows="2" type="text" placeholder="Enter Project Description ..." onChange={props.handleFieldChange} /> <br/>
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
        if(project != null){
          this.setState({errorMessage: 'project name is already taken!'});
          return;
        }
        Client.addProject(this.state.projectTitle, this.state.descriptionField, function(){});
        this.props.handleProjectComplete();
      })
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
          <CreateProjectDisplay
            handleClick={this.handleClick}
            errorMessage={this.state.errorMessage}
            handleFieldChange={this.handleInputChange}
          />
      </div>
    );
  }
}

export default CreateProjectForm
