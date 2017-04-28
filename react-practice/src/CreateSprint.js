import React, { Component } from 'react';
import Client from './Client';


class CreateSprint extends Component {

  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {
    return (
    <div className="EditPBIBackground">
          <div id="EditTaskForm">
      <button onClick={this.props.close}> back </button>
      </div>
    </div>

    );
  }

}

export default CreateSprint;
