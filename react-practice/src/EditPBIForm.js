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
        <h1>Edit PBI Form</h1> <br/>
<PBIFormattedSection handleInputChange={this.handleInputChange}/>
        </div>
        <button onClick={this.props.exit}>Save & Exit</button>
      </div>
    );
  }
}

export default EditPBIForm;
