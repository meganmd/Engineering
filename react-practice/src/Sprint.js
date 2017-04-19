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
  /*
  divStyle =   {
  position: "absolute";
    width: "80%";
    left: "20%";
    height: "100%";
    background: "#000000";
    style={divStyle}
  }
  */
  return (
    <div className="sprint" >
      <div id="title"><h3>Sprint Title</h3></div>
      <br/>
      <ColumnContents column="sprintbacklog" title="Sprint Backlog"/>
    </div>
  );}

}

export default Sprint
