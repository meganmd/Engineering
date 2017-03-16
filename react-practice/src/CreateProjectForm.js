import React, { Component } from 'react';

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
    console.log("why wont this work!!!!!");
    this.props.handleProjectComplete();
    // if(this.projectTitle.getValue.length === 0){
    //   console.log("we in yo");
    //   this.setState({errorMessage: 'Please enter in a title for your project'});
    // }else{
    //   //submit stuff to database and exit
    // }
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
            errorMessage={this.errorMessage}
          />
      </div>
    );
  }
}

export default CreateProjectForm
