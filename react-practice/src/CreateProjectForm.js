import React, { Component } from 'react';

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

function AddUserDisplay(props){
  return(
    <div className="CreateProject">
       Username*<br/>
      <input type="text" placeholder="Enter Username ... "
        onChange={props.handleProjectNameChange}/> <br/>
      <br/> <font color="red">{props.errorMessage}</font>
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
        console.log("why wont this work!!!!!");
        //submit credentials to database here
        this.props.handleProjectComplete();
    }else{
      console.log("Should display error");
      this.setState({errorMessage:'Project name cannot be empty!'});
      console.log(this.state.errorMessage + "<- should be something here!");
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
