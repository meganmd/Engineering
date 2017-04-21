import React, { Component } from 'react';
import Client from './Client';

function ColumnContents(props){
  var content = [];
  for(var i=0; i<props.items.length; i++){
    var divStyle = {
      background: "#dfdfdf",'boxShadow': '0 0 4px 4px #666666',
      width: "95%", "margin-bottom":"20px", "min-height":"50px"};
      content.push(<div id={i} className={props.column} style={divStyle} draggable="true" onDragStart={props.drag}> {props.items[i]} </div>);
  }
  return(
    <div id={props.column} className="9999" onDrop={props.drop} onDragOver={props.allowDrop}>
      <div id="title"><h3>{props.title}</h3></div>
      {content}
    </div>
  );
}

class Sprint extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.getColumnNumberByName = this.getColumnNumberByName.bind(this);
  }

  getColumnNumberByName(name){
    if(name==="sprintbacklog"){
      return 0;
    }else if(name==="todo"){
      return 1;
    }else if(name==="inprogress"){
      return 2;
    }else{
      return 3;
    }
  }

  //--------------------------------------------DND-------------------------------------------------------------
    allowDrop(ev) {
        ev.preventDefault();
    }

    drop(ev) {
      ev.preventDefault();
      var row = ev.target.className;
      if(row==="9999"){
        this.props.addToEnd(this.props.sprintNumber,
        ev.dataTransfer.getData("row"),
        this.getColumnNumberByName(ev.dataTransfer.getData("column")),
        this.getColumnNumberByName(ev.target.id));
      }else{
          console.log("dropping height "+ ev.target.className);
      }

    //  this.props.moveProductBacklog(ev.dataTransfer.getData('row'),ev.target.className);
    }

    drag(ev) {
      console.log("dragging column "+ ev.target.id + " - " + ev.target.className);
      ev.dataTransfer.setData("row", ev.target.id);
      ev.dataTransfer.setData("column", ev.target.className);
    }

render(){
  return (
    <div className="sprint" >
      <div id="title"><h3>Sprint Title</h3></div>
      <br/>
      <ColumnContents column="sprintbacklog"  title="Sprint Backlog" items={this.props.items[0]}
      drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
      <ColumnContents column="todo" title="To Do" items={this.props.items[1]}
      drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
      <ColumnContents column="inprogress" title="In Progress" items={this.props.items[2]}
      drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
      <ColumnContents column="done" title="Done"items={this.props.items[3]}
      drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
    </div>
  );}

}

export default Sprint
