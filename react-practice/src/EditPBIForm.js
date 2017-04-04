import React, { Component } from 'react';

function PBIFormattedSection(props){
  return(
    <div className="PBIAutoCategories">
      As a: <input id="editFormat" width="100%" name="role" type="text"
        placeholder="Enter Role..." value={props.role}
        onChange={props.handleInputChange} /> <br/>
      I can: <input id="editFormat" name="functionality" type="text"
        placeholder="Enter functionality..." value={props.functionality}
        onChange={props.handleInputChange} /> <br/>
      So that: <input id="editFormat" name="value" type="text"
        placeholder="Enter value..." value={props.value}
        onChange={props.handleInputChange} />
    </div>
  );
}

class EditPBIForm extends Component {

  constructor(props) {
    super(props);
    this.state = {description:props.pbi.description,role: props.pbi.role, functionality: props.pbi.functionality, value:props.pbi.value,
      acceptanceCriteria:props.pbi.acceptanceCriteria, estimate:props.pbi.estimate, errorMessage:''};
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
      if(this.state.description === '' && (this.state.role === '' || this.state.functionality === '' || this.state.value === '')){
        this.setState({errorMessage: 'Must have description OR role, functionality, and value'});
      }
      else if(this.state.acceptanceCriteria === ''){
        this.setState({errorMessage: 'Must have acceptance criteria'});
      }
      else{
        this.props.updatePBI(this.props.pbi.id, this.state.description,
          this.state.role, this.state.functionality, this.state.value,
          this.state.acceptanceCriteria, this.state.estimate, function(){});
          this.props.exit();
      }
    }

  render(){
    return (
      <div style={this.divStyle}>
        <div id="EditPBIForm">
        <h3>Edit User Story</h3>
        <h3>Description</h3> <textarea id="fillparent" value={this.state.description}
          name="description" cols="40" rows="2" type="text"
          placeholder="Enter Description..."
            onChange={this.handleInputChange} /><br/>
        <PBIFormattedSection handleInputChange={this.handleInputChange}
          role={this.state.role} functionality={this.state.functionality}
          value={this.state.value}/>
        <h3>Acceptance Criteria</h3> <textarea id="fillparent" name="acceptanceCriteria"
          value={this.state.acceptanceCriteria} type="text"
          placeholder="Enter Acceptance Criteria..."
          onChange={this.handleInputChange} />
          <h3>Estimate <select name="estimate" onChange={this.handleInputChange} value={this.state.estimate}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra-Large</option>
          </select><br/> </h3> <br/>
        <button id="cancelEditPBIButton" onClick={this.props.exit}>Cancel</button>
        <button id="editPBIButton" className="savePBIButton" onClick={this.saveData}>Save</button>
        </div>
      </div>
    );
  }
}

export default EditPBIForm;
