import React, { Component } from 'react';
import Client from './Client';
import EditTaskForm from './EditTaskForm';

function BacklogColumnContents(props){
  var content = [];
  for(var i=0; i<props.items.length; i++){
    var divStyle = {
      background: "#dfdfdf",'boxShadow': '0 0 4px 4px #666666',
      width: "95%", "marginBottom":"20px", "minHeight":"50px"};
      content.push(<div key={i} id={i} className={props.column} onClick={props.editTask} style={divStyle} draggable="true" onDragStart={props.drag}> {props.items[i].description} </div>);
  }
  return(
    <div id={props.column} className="9999" onDrop={props.drop} onDragOver={props.allowDrop}>
      <div id="title"><h3>{props.title}</h3></div>
      {content}
    </div>
  );
}

function ColumnContents(props){
  var content = [];
  for(var i=0; i<props.items.length; i++){
    var divStyle = {
      background: "#dfdfdf",'boxShadow': '0 0 4px 4px #666666',
      width: "95%", "marginBottom":"20px", "minHeight":"50px"};
      content.push(<div key={i} id={i} className={props.column} onClick={props.editTask} style={divStyle} draggable="true" onDragStart={props.drag}> {props.items[i]} </div>);
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
    this.state = {
      editTask: null,
      pbis: []};
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.getColumnNumberByName = this.getColumnNumberByName.bind(this);
    this.updatePBIs = this.updatePBIs.bind(this);
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

    //REORDERING SPRINT BACKLOG
    if(ev.dataTransfer.getData("column")==="sprintbacklog" && (ev.target.id==="sprintbacklog" || ev.target.className==="sprintbacklog")){
      if(row==="9999"){
        var from = ev.dataTransfer.getData('row');
        var items = this.state.pbis;
        var item = items.splice(from,1);
        items.push(item[0]);
        this.setState({pbis:items});
        for(var i = 0; i < this.state.pbis.length; i++){
          Client.moveSprintPBI(this.state.pbis[i].id, this.props.project.name, this.props.sprintNumber, i, function(){});
        }
      } else{
        var from = ev.dataTransfer.getData('row');
        var to = ev.target.id;
        var items = this.state.pbis;
        var item = items.splice(from,1);
        items.splice(to,0,item[0]);
        this.setState({pbis:items});
        for(var i = 0; i < this.state.pbis.length; i++){
          Client.moveSprintPBI(this.state.pbis[i].id, this.props.project.name, this.props.sprintNumber, i, function(){});
        }
      }
    }

    if(ev.dataTransfer.getData("column")==="sprintbacklog" && (ev.target.id !== "sprintbacklog" && ev.target.className !== "sprintbacklog")){

    }else if(ev.dataTransfer.getData("column")!== "sprintbacklog" && (ev.target.id==="sprintbacklog" || ev.target.className==="sprintbacklog")){

    }else if(row==="9999"){

      // this.props.addToEnd(this.props.sprintNumber,
      // ev.dataTransfer.getData("row"),
      // this.getColumnNumberByName(ev.dataTransfer.getData("column")),
      // this.getColumnNumberByName(ev.target.id));
    }else{

      // this.props.move(this.props.sprintNumber,
      // ev.dataTransfer.getData("row"),
      // this.getColumnNumberByName(ev.dataTransfer.getData("column")),
      // ev.target.id,
      // this.getColumnNumberByName(ev.target.className));
      // console.log("dropping height "+ ev.target.className);
    }
  //  this.props.moveProductBacklog(ev.dataTransfer.getData('row'),ev.target.className);
  }

  drag(ev) {
    console.log("dragging column "+ ev.target.id + " - " + ev.target.className);
    ev.dataTransfer.setData("row", ev.target.id);
    ev.dataTransfer.setData("column", ev.target.className);
  }

  openEditTaskForm(task){
    this.setState({editTask: task});
  }

  exitEditTaskForm(){
    this.setState({editTask: null});
  }

  updatePBIs(){
    Client.getSprintBacklog(this.props.project.name, this.props.sprintNumber, (pbis) => {
      console.log(pbis);
      this.setState({pbis: pbis});
    })
  }

  componentWillMount() {
    this.props.passUpFunction("sprintUpdate",this.updatePBIs);
    this.updatePBIs();
  }

  render(){
    var editTask;
    if(this.state.editTask !== null){
      editTask=<EditTaskForm
      height={510}
      exit={this.exitEditTask}/>
    }
    return (
      <div className="sprint" >
        <div id="title"><h3>Sprint Title</h3></div>
        <br/>
        <BacklogColumnContents column="sprintbacklog"  title="Sprint Backlog" items={this.state.pbis}
        drop={this.drop} drag={this.drag} allowDrop={this.allowDrop}/>
        <ColumnContents column="todo" title="To Do" items={this.props.items[1]}
        drop={this.drop} drag={this.drag} allowDrop={this.allowDrop} editTask={this.props.editTask}/>
        <ColumnContents column="inprogress" title="In Progress" items={this.props.items[2]}
        drop={this.drop} drag={this.drag} allowDrop={this.allowDrop} editTask={this.props.editTask}/>
        <ColumnContents column="done" title="Done"items={this.props.items[3]}
        drop={this.drop} drag={this.drag} allowDrop={this.allowDrop} editTask={this.props.editTask}/>
        {editTask}
      </div>
    );}

  }

export default Sprint
