import React, { Component } from 'react';
import Client from './Client'

/*
          <th style={{width:"20%"}}>Product Backlog</th>
*/
function PBIBacklogDisplay(props){
  return(
    <div className="CreateProject">
      <h1>{props.projectName}</h1>
    <div id="board" style={{width:"100%"}}>
      <div id="productbacklog">
        <div id="title">Product Backlog</div>
      </div>
      <div id="scrumbacklog">
        <div id="title">Scrum Backlog</div>
      </div>
      <div id="todo">
        <div id="title">To Do</div>
      </div>
      <div id="inprogress">
        <div id="title">In Progress</div>
      </div>
      <div id="done">
        <div id="title">Done</div>
      </div>
    </div>
    </div>
  );
}

class PBIBacklogForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="PBIBacklogDisplay">
          <PBIBacklogDisplay
          projectName={this.props.projectName}/>
      </div>
    );
  }
}

export default PBIBacklogForm
