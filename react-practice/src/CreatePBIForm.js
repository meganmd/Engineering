import React, { Component } from 'react';

function PBIFormattedSection(props){
  return(
    <div className="PBIAutoCategories">
      As a: <input name="role" type="text" placeholder="Enter Role..."
        onChange={props.handleInputChange} /> <br/>
      I can: <textarea name="action" type="text" placeholder="Enter Action..."
        onChange={props.handleInputChange} /> <br/>
      So that: <textarea name="reason" type="text" placeholder="Enter Reason..."
        onChange={props.handleInputChange} /><br/>
    </div>
  );
}

function CreatePBIDisplay(props){
  return(
    <div className="CreatePBI">
      Description: <textarea name="description" cols="40" rows="2" type="text" placeholder="Enter Description..."
        onChange={props.handleInputChange} /> <br/>
      <PBIFormattedSection handleInputChange={props.handleInputChange} />
      Acceptance Criteria: <textarea name="acceptanceCriteria" type="text"
        placeholder="Enter Acceptance Criteria..."
        onChange={props.handleInputChange} /> <br/>
      Estimate: <select name="estimate" onChange={props.handleInputChange}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extra-large">Extra-Large</option>
      </select><br />
      <button onClick={props.handleCancelClick}>Cancel</button>
      <button className="createPBIButton" onClick={props.handleCreateClick}>Create PBI</button>
      <br/> <font color="red">{props.errorMessage}</font>
    </div>
  );
}

class CreatePBIForm extends Component {
  constructor(props) {
    super(props);
    this.state = {description:'',role: '', action:'', reason:'',
    acceptanceCriteria:'', estimate:'small', errorMessage:''};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleCancelClick(){
    this.props.leavePBIForm();
  }

  handleCreateClick(){
    if(this.state.description === '' && (this.state.role === '' || this.state.action === '' || this.state.reason === '')){
      this.setState({errorMessage: 'Must have description OR role, action, and reason'});
    }
    else if(this.state.acceptanceCriteria === ''){
      this.setState({errorMessage: 'Must have acceptance criteria'});
    }
    else{
      this.props.addPBI(this.state.description, this.state.role,
        this.state.action, this.state.reason, this.state.acceptanceCriteria,
        this.state.estimate);
      this.props.leavePBIForm();
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
