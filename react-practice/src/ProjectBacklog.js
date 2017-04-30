import React, { Component } from 'react';
import Client from './Client';
import ProductBacklogForm from './ProductBacklogForm';
import Sprint from './Sprint';
import EditPBIForm from './EditPBIForm'

class ProjectBacklog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:510,
      sprints: [],
      editPBI: null,
      productBacklogUpdate: null,
      sprintUpdate: null,
      errorMessage: "",
      sprintUpdateFunctionsArray: [],
      members: []
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
    this.addSprint = this.addSprint.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.rejectPBI = this.rejectPBI.bind(this);
    this.acceptPBI = this.acceptPBI.bind(this);
    this.passUpSprintUpdateForAddSprint = this.passUpSprintUpdateForAddSprint.bind(this);
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
      Client.addPBIToSprint(pbi.id, this.props.project.name, this.state.sprints[0].number, function(){});
      this.setState({errorMessage: ""});
      this.updateChildren();
    } else{
      //Bad STUFF
      console.log("FAIL");
      this.setState({errorMessage: "Error: Top user story is incomplete. Add role, functionality, value, and acceptanceCriteria"})
    }
  }

  rejectPBI(pbi,reason){
    Client.rejectPBI(pbi.id, this.props.project.name, this.state.sprints[0].number, reason, function(){})
    this.setState({errorMessage: ""});
    this.updateChildren();
  }

  acceptPBI(pbi){
    Client.acceptPBI(pbi.id,this.props.project.name, this.state.sprints[0].number, function(){});
    this.setState({errorMessage: ""});
    this.updateChildren();
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

  passUpSprintUpdateForAddSprint(fun){
    var ar = this.state.sprintUpdateFunctionsArray;
    ar.push(fun);
    this.setState({sprintUpdateFunctionsArray: ar});
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

  addSprint(){
    Client.addSprint(this.props.project.name, this.state.sprints.length + 1, () => {
      Client.getSprints(this.props.project.name, (sprints) => {
        console.log("STUFF");
        this.setState({sprints: sprints});
        // this.state.sprintUpdate();
        for(var i = 0; i < sprints.length; i++){
          console.log("Try to call " + i);
          this.state.sprintUpdateFunctionsArray[i]();
        }
      });
    });
  }

  getMembers(){
    Client.getUsersFromProject(this.props.project.name, (members) => {
      this.setState({members: members});
    });
  }


  componentWillMount() {
    this.getSprints();
    this.getMembers();
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
    var currentSprint = false;
    if(i == 0){
      currentSprint = true;
    }
    sprints.push(
      <Sprint
      key={i}
      sprintNumber={this.state.sprints[i].number}
      move={this.move}
      addToEnd={this.addToEnd}
      passUpFunction={this.passUpFunction}
      project={this.props.project}
      members={this.state.members}
      openEditPBI={this.openEditPBI}
      rejectPBI={this.rejectPBI}
      acceptPBI={this.acceptPBI}
      currentSprint={currentSprint}
      passUpSprintUpdate={this.passUpSprintUpdateForAddSprint}/>
    )
  }

  return (
    <div>
      <font color="red">{this.state.errorMessage}</font>
      <button onClick={this.addSprint}>Start New Sprint</button>

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
