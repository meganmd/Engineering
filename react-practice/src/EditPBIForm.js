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
    this.state = {description:props.pbi.description,role: '', functionality:'', value:'',
    acceptanceCriteria:'', estimate:props.pbi.size, errorMessage:''};
    this.divStyle = {
      position: 'absolute',
      left: '0',
      top: '0',
      background: '#555555dd',
      width: '100%',
      'min-height': '760px',
      height: props.height+75,
    };
    console.log(props.height+ "<- should be");
    this.handleInputChange = this.handleInputChange.bind(this);
    this.saveData = this.saveData.bind(this);
    }

    handleInputChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    saveData(data){
      console.log("saving data");
      this.props.updatePBI(this.state,this.props.row, this.props.column);
      this.props.exit();
      //call client to save data

    }

  render(){
    return (
      <div style={this.divStyle}>
        <div id="EditPBIForm">
        <h3>User Story</h3>
        <PBIFormattedSection handleInputChange={this.handleInputChange}/>
        <h3>Acceptance Criteria</h3> <textarea id="fillparent" name="acceptanceCriteria" type="text"
          placeholder="Enter Acceptance Criteria..."
          onChange={this.handleInputChange} />
          <h3>Estimate <select name="estimate" onChange={this.handleInputChange} value={this.state.estimate}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra-Large</option>
          </select><br/> </h3> <br/>
        <h3>Description</h3> <textarea id="fillparent" value={this.state.description} name="description" cols="40" rows="2" type="text" placeholder="Enter Description..."
            onChange={this.handleInputChange} /><br/>
        <button id="editPBIButton" onClick={this.saveData}>Save</button>
        <button id="editPBIButton" onClick={this.props.exit}>Exit</button>
        </div>
      </div>
    );
  }
}

export default EditPBIForm;
