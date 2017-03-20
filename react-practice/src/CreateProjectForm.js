import React, { Component } from 'react';
import Client from './Client'


function CreateProjectDisplay(props){
  return(
    <div className="CreateProject">
      Project Name*<br/>
      <input type="text" placeholder="Enter Project Name ... "
        onChange={props.handleProjectNameChange}/> <br/>
        Description<br/>
      <textarea align="bottom" cols="40" rows="2" type="text" placeholder="Enter Project Description ..." onChange={props.handleDescriptionChange} /> <br/>
      <font color="red">{props.errorMessage}</font><br/>
      <button onClick={props.handleCreateClick}>Create Project</button>
      <br/> <font color="red">{props.errorMessage}</font>
    </div>
  );
}


class CreateProjectForm extends Component {

  constructor(props) {
    super(props);
    this.state = {projectTitle: '', descriptionField: '', errorMessage: ''};
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleCreateClick(props){
    if(this.state.projectTitle.length > 0){
      Client.addProject(this.state.projectTitle, this.state.descriptionField, function(){});

        console.log("why wont this work!!!!!");
        //submit credentials to database here
        //this.props.handleProjectComplete();
    } else {
      console.log("Should display error");
      this.setState({errorMessage:'Please enter in a title for your project'});
    }
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
            handleDescriptionChange={this.handleDescriptionChange}
            handleProjectNameChange={this.handleProjectNameChange}
            handleCreateClick={this.handleCreateClick}
            errorMessage={this.state.errorMessage}
          />
      </div>
    );
  }
}

export default CreateProjectForm
