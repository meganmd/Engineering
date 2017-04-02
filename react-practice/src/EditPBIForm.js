import React, { Component } from 'react';

function PBIFormattedSection(props){
  return(
    <div className="PBIAutoCategories" padding="5px">
      As a: <input id="editFormat" width="100%" name="role" type="text" placeholder="Enter Role..."
        onChange={props.handleInputChange} /> <br/>
      I can: <input id="editFormat" name="functionality" type="text" placeholder="Enter functionality..."
        onChange={props.handleInputChange} /> <br/>
      So that: <input id="editFormat" name="value" type="text" placeholder="Enter value..."
        onChange={props.handleInputChange} />
    </div>
  );
}

class EditPBIForm extends Component {

  constructor(props) {
    super(props);
    this.state = {description:'',role: '', functionality:'', value:'',
    acceptanceCriteria:'', estimate:'small', errorMessage:''};
    this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

  render(){
    return (
      <div id="EditPBIBackground">
        <div id="EditPBIForm">
        <h1 id="editheader">Edit PBI Form</h1> <br/>
        <h3>User Story</h3>
        <PBIFormattedSection handleInputChange={this.handleInputChange}/>
        <h3>Acceptance Criteria</h3> <textarea id="fillparent" name="acceptanceCriteria" type="text"
          placeholder="Enter Acceptance Criteria..."
          onChange={this.handleInputChange} />
        <button onClick={this.props.exit}>Save</button>
        </div>
      </div>
    );
  }
}

export default EditPBIForm;
