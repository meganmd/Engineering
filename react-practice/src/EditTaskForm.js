import React, { Component } from 'react';
import Client from './Client';

class EditTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.divStyle = {
      position: 'absolute',
      left: '0',
      top: '0',
      background: '#555555dd',
      width: '100%',
      height: "100%",
    };
  }

  //------------------------------------------- render ----------------------------------------------
  render(){
    return (
      <div style={this.divStyle}>
      <div id="EditTaskForm">
        <h3>Note</h3> <textarea id="fillparent" name="acceptanceCriteria"
          type="text"
          placeholder="Enter Note..."/>
        <h3>Acceptance Criteria</h3> <textarea id="fillparent" name="acceptanceCriteria"
          type="text"
          placeholder="Enter Acceptance Criteria..."/>
      <button onClick={this.props.exit}>Cancel</button>
      <button>Save</button>
      </div>
      </div>
    );
  }
}

export default EditTaskForm;
