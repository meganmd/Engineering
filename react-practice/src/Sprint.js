import React, { Component } from 'react';
import Client from './Client';

function ColumnContents(props){
  var content = [];
  for(var i=0; i<props.items.length; i++){
    var divStyle = {
      background: "#dfdfdf",'boxShadow': '0 0 4px 4px #666666',
      width: "95%", "margin-bottom":"20px", "min-height":"50px"};
      content.push(<div key={i} style={divStyle}> {props.items[i]} </div>);
  }
  return(
    <div id={props.column}>
      <div id="title"><h3>{props.title}</h3></div>
      {content}
    </div>
  );
}

class Sprint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

render(){
  return (
    <div className="sprint" >
      <div id="title"><h3>Sprint Title</h3></div>
      <br/>
      <ColumnContents column="sprintbacklog" title="Sprint Backlog" items={this.props.items[0]}/>
      <ColumnContents column="todo" title="To Do" items={this.props.items[1]}/>
      <ColumnContents column="inprogress" title="In Progress" items={this.props.items[2]}/>
      <ColumnContents column="done" title="Done"items={this.props.items[3]}/>
    </div>
  );}

}

export default Sprint
