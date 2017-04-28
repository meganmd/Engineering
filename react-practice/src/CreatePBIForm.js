import React, { Component } from 'react';
import Client from './Client'

function PBIFormattedSection(props){
  return(
    <div className="PBIAutoCategories">
      As a: <input id="editFormat" width="100%" name="role" type="text"
        placeholder="Enter Role..."
        onChange={props.handleInputChange} /> <br/>
      I can: <textarea id="fillparent" name="functionality" type="text"
        placeholder="Enter functionality..."
        onChange={props.handleInputChange} /> <br/>
      So that: <textarea id="fillparent" name="value" type="text" placeholder="Enter value..."
        onChange={props.handleInputChange} /><br/>
    </div>
  );
}

function CreatePBIDisplay(props){
  return(
    <div id="EditPBIBackground">
      <div id="EditPBIForm">
        <div className="CreatePBI">
          <h3>Create New User Story</h3>
          Description: <textarea id="fillparent" name="description" cols="40" rows="2" type="text" placeholder="Enter Description..."
            onChange={props.handleInputChange} /> <br/>
          <PBIFormattedSection handleInputChange={props.handleInputChange} />
          Acceptance Criteria: <textarea id="fillparent" name="acceptanceCriteria" type="text"
            placeholder="Enter Acceptance Criteria..."
            onChange={props.handleInputChange} /> <br/>
          Estimate: <select name="estimate" onChange={props.handleInputChange}>
              <option value="undecided">undecided</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra-Large</option>
          </select><br />
          <button id="editPBIButton" onClick={props.handleCancelClick}>Cancel</button>
          <button id="editPBIButton" className="createPBIButton" onClick={props.handleCreateClick}>Create PBI</button>
          <br/> <font color="red">{props.errorMessage}</font>
        </div>
      </div>
    </div>
  );
}

class CreatePBIForm extends Component {
  constructor(props) {
    super(props);
    this.state = {description:'',role: '', functionality:'', value:'',
    acceptanceCriteria:'', estimate:'small', errorMessage:''};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleCancelClick(){
    this.props.exit();
  }

  handleCreateClick(){
    if(this.state.description === '' && (this.state.role === '' || this.state.functionality === '' || this.state.value === '')){
      this.setState({errorMessage: 'Must have description OR role, functionality, and value'});
    }else{
      Client.addPBI(this.state.description, this.state.role,
        this.state.functionality, this.state.value, this.state.acceptanceCriteria,
        this.state.estimate, this.props.projectName, this.props.addPBIComplete);
      this.setState({errorMessage: ''});
    }
  }

  render() {
    return (
      <div className="CreatePBI">
          <CreatePBIDisplay
            handleInputChange={this.handleInputChange}
            handleCreateClick={this.handleCreateClick}
            handleCancelClick={this.handleCancelClick}
            errorMessage={this.state.errorMessage}
          />
      </div>
    );
  }
}

export default CreatePBIForm
