import React, { Component } from 'react';
import Client from './Client';
import EditTaskForm from './EditTaskForm';
import CreateTaskForm from './createTaskForm'
import RejectUserStoryForm from './rejectUserStoryForm'

function BacklogColumnContents(props){
  var content = [];

  var divStyle = {
    background: "#dfdfdf",'boxShadow': '0 0 4px 4px #666666',
    width: "95%", "marginBottom":"20px", "minHeight":"50px"};

  for(var i=0; i< props.items.length; i++){
      var status = [];
      if(props.role === "product owner" && props.items[i].status === "none" && props.currentSprint){
        status.push(<button className="rejectPBIButton" key={"reject"+i} id={i} onClick={props.rejectButton}> Reject </button>);
        status.push(<button className="acceptPBIButton" key={"accept"+i} id={i} onClick={props.acceptButton}> Accept </button>);
      } else if(props.items[i].status === "rejected"){
        status.push(<font color="red" key={0} id={i} className={props.column}>Rejected: {props.items[i].reason}</font>)
      } else if(props.items[i].status === "accepted"){
        status.push(<font color="green" key={0} id={i} className={props.column}>Accepted</font>)
      }
      content.push(
        <div key={i} id={i} className={props.column} style={divStyle} draggable="true" onDragStart={props.drag}>
          <div className={i} onClick={props.editPBI}>
            {props.items[i].description}
          </div>
          {props.items[i].percentComplete}%
          <br/>
          {status}
        </div>);
      // Client.getPercentBreakdownByPBI(props.items[i].id, 1, (percentBreakdown) => {
      //   console.log(percentBreakdown);
      // })
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
      background: "#ffffff",'boxShadow': '0 0 4px 4px #666666',
      width: "95%", "marginBottom":"20px", "minHeight":"50px"};
      content.push(
        <div key={i} id={i} className={props.column} onClick={props.editTask} style={divStyle} draggable="true" onDragStart={props.drag}> {props.items[i].description} </div>);
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
      rejectPBI: null,
      createTask: false,
      pbis: [],
      todo: [],
      inProgress: [],
      done: [],
      errorMessage: ""
    };
    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.getColumnNumberByName = this.getColumnNumberByName.bind(this);
    this.updatePBIs = this.updatePBIs.bind(this);
    this.handleCreateTaskComplete = this.handleCreateTaskComplete.bind(this);
    this.openCreateTask = this.openCreateTask.bind(this);
    this.exitCreateTask = this.exitCreateTask.bind(this);
    this.clickPBI = this.clickPBI.bind(this);
    this.openEditTaskForm = this.openEditTaskForm.bind(this);
    this.exitEditTaskForm = this.exitEditTaskForm.bind(this);
    this.handleEditTaskComplete = this.handleEditTaskComplete.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.openRejectUserStoryForm = this.openRejectUserStoryForm.bind(this);
    this.exitRejectUserStoryForm = this.exitRejectUserStoryForm.bind(this);
    this.clickAcceptButton = this.clickAcceptButton.bind(this);
    this.updateAll = this.updateAll.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
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
    if(!this.props.currentSprint){
      return;
    }
    var row = ev.target.className;


    //REORDERING SPRINT BACKLOG
    if(ev.dataTransfer.getData("column")==="sprintbacklog" && (ev.target.id==="sprintbacklog" || ev.target.className==="sprintbacklog")){
      // console.log("IDENTIFIED SPRINT MOVE")

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
        from = ev.dataTransfer.getData('row');
        var to = ev.target.id;
        items = this.state.pbis;
        item = items.splice(from,1);
        items.splice(to,0,item[0]);
        this.setState({pbis:items});
        for(i = 0; i < this.state.pbis.length; i++){
          Client.moveSprintPBI(this.state.pbis[i].id, this.props.project.name, this.props.sprintNumber, i, function(){});
        }
      }
      //MOVING TASKS
    } else if(this.props.project.role === "development team member" && ev.dataTransfer.getData("column")!=="sprintbacklog" && ev.target.id!=="sprintbacklog" && ev.target.className!=="sprintbacklog"){
      var rowFrom = ev.dataTransfer.getData('row');
      var columnFrom = ev.dataTransfer.getData("column")
      var columnTo;
      var rowTo;
      var task;
      var id;

      //Get the ID
      if(columnFrom === "inprogress"){
        task = this.state.inProgress[rowFrom];
      } else{
        task = this.state[columnFrom][rowFrom];
      }
      id = task.id;

      //MOVING TO END OF COLUMN
      if(row==="9999"){
        if(ev.target.id === "todo"){
          columnTo = 1;
          rowTo = this.state.todo.length;
        } else if(ev.target.id === "inprogress"){
          columnTo = 2;
          rowTo = this.state.inProgress.length;
        } else if(ev.target.id === "done"){
          columnTo = 3;
          rowTo = this.state.done.length;
        } else{
          return;
        }
        // console.log("Destination: end of " + ev.target.id);
      //MOVING TO SPECIFIC LOCATION
      } else{
        rowTo = ev.target.id;
        if(row === "todo"){
          columnTo = 1;
        } else if(row === "inprogress"){
          columnTo = 2;
        } else if(row === "done"){
          columnTo = 3;
        } else{
          return;
        }
        // console.log("Destination: row " + ev.target.id + " of column " + row);
        // console.log(this.state[columnFrom][rowFrom].id);
      }
      // console.log("Moving from " + columnFrom + "-" + rowFrom + " to " + columnTo + "-" + rowTo);

      if((task.member === "unselected" ||  !(task.percent > 0) ) && (columnTo === 2 || columnTo === 3)){
        this.setState({errorMessage: "Must assign task and give percentage before moving to in progress or done"});
      } else{
        Client.moveTask(id, columnTo, rowTo, this.updateAll);
        this.setState({errorMessage: ""});
      }
    }
  }

  drag(ev) {
    console.log("dragging column "+ ev.target.id + " - " + ev.target.className);
    ev.dataTransfer.setData("row", ev.target.id);
    ev.dataTransfer.setData("column", ev.target.className);
  }

  updateAll(){
    // console.log("Update all for " + this.props.sprintNumber);
    this.updatePBIs();
    this.updateTasks();
  }

  updatePBIs(){
    Client.getSprintBacklog(this.props.project.name, this.props.sprintNumber, (pbis) => {
      // console.log(pbis);
      this.setState({pbis: pbis});
    })
  }

  updateTasks(){
    Client.getTasksBySprint(this.props.project.name, this.props.sprintNumber, (tasks) => {
      // console.log(tasks);
      var todo = [];
      var inProgress = [];
      var done = [];
      for(var i = 0; i < tasks.length; i++){
        if(tasks[i].columnNumber === 1){
          todo.push(tasks[i]);
        } else if(tasks[i].columnNumber === 2){
          inProgress.push(tasks[i]);
        }else if(tasks[i].columnNumber === 3){
          done.push(tasks[i]);
        }
      }
      this.setState({todo: todo, inProgress: inProgress, done: done});
    });
  }

  handleCreateTaskComplete(){
    //fill in later
    this.updateTasks();
    this.exitCreateTask();
  }

  exitCreateTask(){
    this.setState({createTask: false});
  }

  openCreateTask(){
    this.setState({createTask: true});
  }

  openEditTaskForm(e){
    // console.log(e.target);
    if(this.props.project.role === "development team member" && this.props.currentSprint){
      var column = e.target.className;
      var target = e.target.id;
      // console.log(column);
      if(column === "todo"){
        this.setState({editTask: this.state.todo[target]});
      } else if(column === "inprogress"){
        this.setState({editTask: this.state.inProgress[target]});
      } else if(column === "done"){
        this.setState({editTask: this.state.done[target]});
      }
    }
  }

  handleEditTaskComplete(){
    this.updateTasks();
    this.updatePBIs();
    this.exitEditTaskForm();
  }

  exitEditTaskForm(){
      this.setState({editTask: null});
  }

  openRejectUserStoryForm(e){
    var row = e.target.id;
    this.setState({rejectPBI: this.state.pbis[row]})
  }

  exitRejectUserStoryForm(){
    this.setState({rejectPBI: null})
  }

  clickAcceptButton(e){
    var row = e.target.id;
    this.props.acceptPBI(this.state.pbis[row]);
  }

  handleDeleteTask(){
    if(this.state.editTask != null){
      Client.deleteTask(this.state.editTask.id, this.handleEditTaskComplete)
    }
  }

  clickPBI(e){
    // console.log(e.target)
    if(this.props.currentSprint){
      this.props.openEditPBI(this.state.pbis[e.target.className]);
    }
  }


  componentWillMount() {
    if(this.props.currentSprint){
      this.props.passUpFunction("sprintUpdate",this.updatePBIs);
    }
    this.props.passUpSprintUpdate(this.updateAll);
    this.updatePBIs();
    console.log("UPDATING...")
    this.updateTasks();
  }

  render(){
    var editTask;
    if(this.state.editTask !== null){
      editTask=<EditTaskForm
        project={this.props.project}
        sprint={this.props.sprintNumber}
        handleEditTaskComplete={this.handleEditTaskComplete}
        exit={this.exitEditTaskForm}
        members={this.props.members}
        pbis={this.state.pbis}
        task={this.state.editTask}
        handleDeleteTask={this.handleDeleteTask}
      />
    }
    var createTask;
    if(this.state.createTask){
      createTask=<CreateTaskForm
        project={this.props.project}
        sprint={this.props.sprintNumber}
        handleTaskComplete={this.handleCreateTaskComplete}
        exit={this.exitCreateTask}
        members={this.props.members}
        pbis={this.state.pbis}
        placeRow={this.state.todo.length}/>
    }
    var rejectPBI;
    if(this.state.rejectPBI !== null){
      rejectPBI = <RejectUserStoryForm
        pbi={this.state.rejectPBI}
        exitReject={this.exitRejectUserStoryForm}
        completeReject={this.props.rejectPBI} />
    }
    var createTaskButton;
    if(this.props.project.role === "development team member" && this.props.currentSprint && this.state.pbis.length > 0){
      createTaskButton = <button className="addPBIButton" onClick={this.openCreateTask}>Create Task</button>;
    }
    return (
      <div className="sprint" >
        <div id="title">
          <h3>Sprint {this.props.sprintNumber}</h3>
          <font color="red">{this.state.errorMessage}</font>
          {createTaskButton}
        </div>
        <br/>
        <BacklogColumnContents
          column="sprintbacklog"
          title="Sprint Backlog"
          items={this.state.pbis}
          drop={this.drop}
          drag={this.drag}
          allowDrop={this.allowDrop}
          editPBI={this.clickPBI}
          role={this.props.project.role}
          rejectButton={this.openRejectUserStoryForm}
          acceptButton={this.clickAcceptButton}
          currentSprint={this.props.currentSprint}/>
        <ColumnContents
          column="todo"
          title="To Do"
          items={this.state.todo}
          drop={this.drop}
          drag={this.drag}
          allowDrop={this.allowDrop}
          editTask={this.openEditTaskForm}/>
        <ColumnContents
          column="inprogress"
          title="In Progress"
          items={this.state.inProgress}
          drop={this.drop}
          drag={this.drag}
          allowDrop={this.allowDrop}
          editTask={this.openEditTaskForm}/>
        <ColumnContents
          column="done"
          title="Done"
          items={this.state.done}
          drop={this.drop}
          drag={this.drag}
          allowDrop={this.allowDrop}
          editTask={this.openEditTaskForm}/>
        {editTask}
        {createTask}
        {rejectPBI}
      </div>
    );}

  }

export default Sprint
