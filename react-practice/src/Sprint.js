import React, { Component } from 'react';
import Client from './Client';

function ColumnContents(props){
  return(
    <div id={props.column}>
      <div id="title"><h3>{props.title}</h3></div>
    </div>
  );
}

class Sprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sprintbacklog:[],
      todo:[],
      inprogress:[],
      done:[],
    };
  }

render(){
  return (
    <div className="sprint" >
      <div id="title"><h3>Sprint Title</h3></div>
      <br/>
      <ColumnContents column="sprintbacklog" title="Sprint Backlog"/>
      <ColumnContents column="todo" title="To Do"/>
      <ColumnContents column="inprogress" title="In Progress"/>
      <ColumnContents column="done" title="Done"/>
    </div>
  );}

}

export default Sprint
