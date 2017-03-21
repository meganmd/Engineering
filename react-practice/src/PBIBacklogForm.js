import React, { Component } from 'react';
import Client from './Client'

/*
          <th style={{width:"20%"}}>Product Backlog</th>
*/
function getCardsForColumn(props){
  //use for loop to add all the cards to the div to return
return(
  <div>

  </div>
);
}

function PBIBacklogDisplay(props){
  return(
    <div className="CreateProject">
      <h1>{props.projectName}</h1>
    <div id="board" style={{width:"100%"}}>
      <div id="productbacklog">
        <div id="title">Product Backlog</div>
        <getCardsForColumn
          column="1"/>
      </div>
      <div id="scrumbacklog">
        <div id="title">Scrum Backlog</div>
        <getCardsForColumn
          column="1"/>
      </div>
      <div id="todo">
        <div id="title">To Do</div>
        <getCardsForColumn
          column="1"/>
      </div>
      <div id="inprogress">
        <div id="title">In Progress</div>
        <getCardsForColumn
          column="1"/>
      </div>
      <div id="done">
        <div id="title">Done</div>
        <getCardsForColumn
          column="1"/>
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
