import React, { Component } from 'react';
import Client from './Client';
import ProductBacklogForm from './ProductBacklogForm';
import Sprint from './Sprint';
import EditTaskForm from './EditTaskForm';

class ProjectBacklog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:"510",
      productBacklog:['user story one', 'user story two', 'user story three'],
      sprints:[[['item 1'],['item 2'],['item 3'],['item 4']]],
      editTaskRow:"",
      editTaskColumn:"",
      editTaskSprint:"",
    };
    this.pushToSprint = this.pushToSprint.bind(this);
    this.moveProductBacklog = this.moveProductBacklog.bind(this);
    this.isFirstStoryProductBacklogComplete = this.isFirstStoryProductBacklogComplete.bind(this);
    this.clearStoryToMove = this.clearStoryToMove.bind(this);
    this.move = this.move.bind(this);
    this.addToEnd = this.addToEnd.bind(this);
    this.exit = this.exit.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  //---------------------------------------- Helper Methods-----------------------------------------------------------

  isFirstStoryProductBacklogComplete(){
    var pbi = this.getState("contents")[0];
    console.log("Role ='" + pbi.role + "' functionality = '" + pbi.functionality + "' acceptanceCriteria = '" + pbi.acceptanceCriteria+"'");
    if(pbi.role != '' && pbi.functionality != '' && pbi.value != '' && pbi.acceptanceCriteria != ''){
      console.log("return true");
      return true;
    }
    return false;
  }

  clearStoryToMove(){
        this.setState({storyToMove:""});
  }

  addToEnd(sprintNumber,fromRow, fromColumn, toColumn){
    var items = this.state.sprints;
    var item = items[sprintNumber][fromColumn].splice(fromRow,1);
    items[sprintNumber][toColumn].push(item);
    this.setState({'sprints':items})
  }

  move(sprintNumber, fromRow, fromColumn, toRow, toColumn){
    var items = this.state.sprints;
    var item = items[sprintNumber][fromColumn].splice(fromRow,1);
    items[sprintNumber][toColumn].splice(toRow,0,item);
    this.setState({'sprints':items})
  }

  pushToSprint(){
    //use an if statement to test and make sure criteria is correct
    console.log("pushing");
    var sprints = this.state.sprints;
    var productBacklog = this.state.productBacklog;
    sprints[0][0].push(productBacklog.shift());
    this.setState({'productBacklog':productBacklog, 'sprints':sprints});
  }

  moveProductBacklog(from, to){
    console.log("moving pbiRow");
    var items = this.state.productBacklog;
    var item = items.splice(from,1);
    items.splice(to,0,item);
    this.setState({'productBacklog':items});
  }

  exit(){
    this.setState({'EditTaskRow':'','editTaskColumn':'','editTaskSprint':''});
  }

  editTask(ev){
    this.setState({'editTaskSprint':1, 'editTaskColumn':1, 'EditTaskRow':1});
  }

//------------------------------------------- render ----------------------------------------------
render(){
  var content;
  if(this.state.EditTaskRow != ""){
    content=<EditTaskForm
    height={this.state.height}
    exit={this.exit}/>
  }
  return (
    <div className="projectBacklog">
        <ProductBacklogForm
        height={this.state.height}
        items={this.state.productBacklog}
        pushToSprint={this.pushToSprint}
        moveProductBacklog={this.moveProductBacklog}/>

        <Sprint
        sprintNumber={0}
        items={this.state.sprints[0]}
        move={this.move}
        addToEnd={this.addToEnd}
        editTask={this.editTask}/>

        {content}
    </div>
  );}

}

export default ProjectBacklog
