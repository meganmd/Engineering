import React, { Component } from 'react';
import Client from './Client'

function getCardsForColumn(props){
  console.log("why is it not getting here");
  return(
    <button width="100%">wtf</button>
  );
}

function PBIBacklogDisplay(props){
  console.log("got here");
  return(
    <div className="Backlog">
      <h1>{props.projectName}</h1>
    <div id="board" style={{width:"100%"}}>
      <div id="productbacklog">
        <div id="title">Product Backlog</div>
        <getCardsForColumn/>
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
    var example = [{description:"this is a user story", size:"small"},{description:"another user story", size:"large"}];
  }

  render() {
    return (
      <div className="PBIBacklogDisplay">
          <PBIBacklogDisplay
          projectName={this.props.projectName}
        project={this.example}/>
      </div>
    );
  }
}

export default PBIBacklogForm
