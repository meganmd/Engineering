import React, { Component } from 'react';
import Client from './Client';
import ProductBacklogForm from './ProductBacklogForm';
import Sprint from './Sprint';
import EditPBIForm from './EditPBIForm'

class ProjectBacklog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:"510",
      productBacklog:['user story one', 'user story two', 'user story three'],
      sprints: [],
      editPBI: null,
      productBacklogUpdate: null,
      sprintUpdate: null,
      errorMessage: ""
    };
    this.pushToSprint = this.pushToSprint.bind(this);
    this.moveProductBacklog = this.moveProductBacklog.bind(this);
    this.isFirstStoryProductBacklogComplete = this.isFirstStoryProductBacklogComplete.bind(this);
    this.clearStoryToMove = this.clearStoryToMove.bind(this);
    this.move = this.move.bind(this);
    this.addToEnd = this.addToEnd.bind(this);
    this.openEditPBI = this.openEditPBI.bind(this);
    this.exitEditPBI = this.exitEditPBI.bind(this);
    this.passUpFunction = this.passUpFunction.bind(this);
    this.updateChildren = this.updateChildren.bind(this);
    this.getSprints = this.getSprints.bind(this);
  }

  //---------------------------------------- Helper Methods-----------------------------------------------------------

  isFirstStoryProductBacklogComplete(){
    var pbi = this.getState("contents")[0];
    console.log("Role ='" + pbi.role + "' functionality = '" + pbi.functionality + "' acceptanceCriteria = '" + pbi.acceptanceCriteria+"'");
    if(pbi.role !== '' && pbi.functionality !== '' && pbi.value !== '' && pbi.acceptanceCriteria !== ''){
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

  pushToSprint(pbi){
    console.log("PUSHING");
    //use an if statement to test and make sure criteria is correct
    console.log(pbi);
    if(pbi.role !== '' && pbi.functionality !== '' && pbi.value !== '' && pbi.acceptanceCriteria !== '' && pbi.estimate !== "undecided"){
      Client.addPBIToSprint(pbi.id, this.props.project.name, 1, 0, function(){});
      this.setState({errorMessage: ""});
      this.updateChildren();
    } else{
      //Bad STUFF
      console.log("FAIL");
      this.setState({errorMessage: "Error: Top user story is incomplete. Add role, functionality, value, and acceptanceCriteria"})
    }
  }

  moveProductBacklog(from, to){
    console.log("moving pbiRow");
    var items = this.state.productBacklog;
    var item = items.splice(from,1);
    items.splice(to,0,item[0]);
    this.setState({'productBacklog':items});
  }

  openEditPBI(pbi){
    this.setState({editPBI: pbi});
  }

  exitEditPBI(){
    this.setState({editPBI:null});
    this.updateChildren();
  }

  passUpFunction(name, fun){
    this.setState({[name]: fun});
  }

  updateChildren(){
    if(this.state.productBacklogUpdate !== null){
      this.state.productBacklogUpdate();
    } else{
      console.log("PB UPDATE NULL");
    }
    if(this.state.sprintUpdate !== null){
      this.state.sprintUpdate();
    }else{
      console.log("SPRINT UPDATE NULL")
    }
  }

  getSprints(){
    Client.getSprints(this.props.project.name, (sprints) => {
      this.setState({sprints: sprints});
    });
  }

  componentWillMount() {
    this.getSprints();
  }

//------------------------------------------- render ----------------------------------------------
render(){
  var editPBIView;
  if(this.state.editPBI !== null){
    console.log(" not empty-----------------------");
    editPBIView = <EditPBIForm
      exit={this.exitEditPBI}
      pbi={this.state.editPBI}
      updatePBI={Client.editPBI}
      row={this.state.editPBIRow}
      column={this.state.editPBIColumn}
    />
  }else{
    console.log("UNDEFINED______________________");
  }
  var sprints = [];
  for(var i = 0; i < this.state.sprints.length; i++){
    sprints.push(
      <Sprint
      sprintNumber={1}
      items={[['item 1'],['item 2'],['item 3'],['item 4']]}
      move={this.move}
      addToEnd={this.addToEnd}
      editTask={this.editTask}
      passUpFunction={this.passUpFunction}
      project={this.props.project}/>
    )
  }

  return (
    <div>
      <font colot="red">{this.state.errorMessage}</font>

      <div className="projectBacklog">
          <ProductBacklogForm
          height={this.state.height}
          items={this.state.productBacklog}
          pushToSprint={this.pushToSprint}
          moveProductBacklog={this.moveProductBacklog}
          project={this.props.project}
          openEditPBI={this.openEditPBI}
          passUpFunction={this.passUpFunction}
          numSprints={1}/>

          {sprints}


          {editPBIView}
      </div>
    </div>
  );}

}

export default ProjectBacklog
