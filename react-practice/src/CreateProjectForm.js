import React, { Component } from 'react';
import Client from './Client'


function CreateProjectDisplay(props){
  return(
    <div className="CreateProject">
      Project Name* <font color="red">{props.errorMessage}</font><br/><br/>
      <input type="text" placeholder="Enter Project Name ... "
        onChange={props.handleProjectNameChange}/> <br/>
        Description<br/>
      <textarea align="bottom" cols="40" rows="2" type="text" placeholder="Enter Project Description ..." onChange={props.handleDescriptionChange} /> <br/>
      <button onClick={props.handleClick}>Create Project</button>
    </div>
  );
}


class CreateProjectForm extends Component {

  constructor(props) {
    super(props);
    this.state = {projectTitle: '', descriptionField: '', errorMessage: '', username:''};
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleProjectNameChange(e){
    this.setState({projectTitle: e.target.value});
  }

  handleDescriptionChange(e){
    this.setState({descriptionField: e.target.value});
  }

  handleUserNameChange(e){
    this.setState({username: e.target.value});
  }

  render() {
    return (
      <div className="CreateProject">
          <CreateProjectDisplay
            handleDescriptionChange={this.handleDescriptionChange}
            handleProjectNameChange={this.handleProjectNameChange}
            handleClick={this.handleClick}
            errorMessage={this.state.errorMessage}
          />
      </div>
    );
  }
}

export default CreateProjectForm
