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
    //get items for sprint
    var it = [['item 1'],['item 2'],['item 3'],['item 4']];
    this.state = {
      items:it
    };

    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.getColumnNumberByName = this.getColumnNumberByName.bind(this);
    this.move = this.move.bind(this);
    this.addToEnd = this.addToEnd.bind(this);
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

  addToEnd(sprintNumber,fromRow, fromColumn, toColumn){
    var items = this.state.items;
    var item = items[fromColumn].splice(fromRow,1);
    items[toColumn].push(item);
    this.setState({'sprints':items})
  }

  move(sprintNumber, fromRow, fromColumn, toRow, toColumn){
    var items = this.state.items;
    var item = items[fromColumn].splice(fromRow,1);
    items[toColumn].splice(toRow,0,item);
    this.setState({'sprints':items})
  }

  //--------------------------------------------DND-------------------------------------------------------------
    allowDrop(ev) {
        ev.preventDefault();
    }

    drop(ev) {
      ev.preventDefault();
      var row = ev.target.className;
      if(ev.dataTransfer.getData("column")==="sprintbacklog" && (ev.target.id != "sprintbacklog" && ev.target.className !="sprintbacklog")){

      }else if(ev.dataTransfer.getData("column")!="sprintbacklog" && (ev.target.id==="sprintbacklog" || ev.target.className==="sprintbacklog")){

      }else if(row==="9999"){
        this.addToEnd(this.props.sprintNumber,
        ev.dataTransfer.getData("row"),
        this.getColumnNumberByName(ev.dataTransfer.getData("column")),
        this.getColumnNumberByName(ev.target.id));
      }else{
        this.move(this.props.sprintNumber,
        ev.dataTransfer.getData("row"),
        this.getColumnNumberByName(ev.dataTransfer.getData("column")),
        ev.target.id,
        this.getColumnNumberByName(ev.target.className));
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
      <ColumnContents column="sprintbacklog"  title="Sprint Backlog" items={this.state.items[0]}
      drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
      <ColumnContents column="todo" title="To Do" items={this.state.items[1]}
      drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
      <ColumnContents column="inprogress" title="In Progress" items={this.state.items[2]}
      drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
      <ColumnContents column="done" title="Done"items={this.state.items[3]}
      drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
    </div>
  );}

}

export default Sprint
