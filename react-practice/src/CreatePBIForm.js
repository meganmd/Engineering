import React, { Component } from 'react';

function PBIFormattedSection(props){
  return(
    <div className="PBIAutoCategories">
      As a: <input type="text" placeholder="Enter Role..."
        onChange={props.handleRoleChange} /> <br/>
      I can: <textarea type="text" placeholder="Enter Action..."
        onChange={props.handleActionChange} /> <br/>
      So that: <textarea type="text" placeholder="Enter Reason..."
        onChange={props.handleReasonChange} /><br/>
    </div>
  );
}

function CreatePBIDisplay(props){
  return(
    <div className="CreatePBI">
      Description: <textarea align="bottom" cols="40" rows="2" type="text" placeholder="Enter Description..."
        onChange={props.handleDescriptionChange} /> <br/>
      <PBIFormattedSection handleRoleChange={props.handleRoleChange}
        handleActionChange={props.handleActionChange}
        handleReasonChange={props.handleReasonChange} />
      Acceptance Criteria: <textarea type="text"
        placeholder="Enter Acceptance Criteria..."
        onChange={props.handleAcceptanceCriteriaChange} /> <br/>
      Estimate: <select onChange={props.handleEstimateChange}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extra-large">Extra-Large</option>
      </select><br />
      <button onClick={props.handleCancelClick}>Cancel</button>
      <button onClick={props.handleCreateClick}>Create PBI</button>
      <br/> <font color="red">{props.errorMessage}</font>
    </div>
  );
}

class CreatePBIForm extends Component {
  constructor(props) {
    super(props);
    this.state = {description:'',role: '', action:'', reason:'',
    acceptanceCriteria:'', estimate:'small', errorMessage:''};
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleAcceptanceCriteriaChange = this.handleAcceptanceCriteriaChange.bind(this);
    this.handleEstimateChange = this.handleEstimateChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    }

  handleDescriptionChange(e){
    this.setState({description: e.target.value});
  }

  handleRoleChange(e){
    this.setState({role: e.target.value});
  }

  handleActionChange(e){
    this.setState({action: e.target.value});
  }

  handleReasonChange(e){
    this.setState({reason: e.target.value});
  }

  handleAcceptanceCriteriaChange(e){
    this.setState({acceptanceCriteria: e.target.value});
  }

  handleEstimateChange(e){
    this.setState({estimate: e.target.value});
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
            handleDescriptionChange={this.handleDescriptionChange}
            handleRoleChange={this.handleRoleChange}
            handleActionChange={this.handleActionChange}
            handleReasonChange={this.handleReasonChange}
            handleAcceptanceCriteriaChange={this.handleAcceptanceCriteriaChange}
            handleEstimateChange={this.handleEstimateChange}
            handleCreateClick={this.handleCreateClick}
            handleCancelClick={this.handleCancelClick}
            errorMessage={this.state.errorMessage}
          />
      </div>
    );
  }
}

export default CreatePBIForm
