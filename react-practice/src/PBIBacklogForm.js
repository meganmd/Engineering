import React, { Component } from 'react';


function GetCardsForColumn(props) {
  //var userStories = getUSerStories by column and project name
  var userStories = props.project;
  var content = [];
  for (var i = 0; i < userStories.length; i++) {
    var divStyle = {
      position:"absolute",
      background: "#dfdfdf",
      border: "2px solid black",
      left: "5%",
      top: "50px",
      width: "90%",
      'min-height': "100px",
      'border-radius':"15px",
      columnColor: "#"
    }
    divStyle.top = (i*125)+35;
    if(divStyle.top > parseInt(props.backlogColumnStyle.height,10)){
      props.updateBoardHeight((i*125)+150);
    }
    content.push(<div id={i} className={props.columnNumber}  style={divStyle} draggable="true" onDragEnd={props.onDragExit} onDragStart={props.drag}><br/>{userStories[i].description}<br/>Size: {userStories[i].size}</div>);
  }

  return(
    <div id={props.columnName} style={props.backlogColumnStyle} onDrop={props.drop} onDragOver={props.allowDrop}>
      <div id="title">{props.title}</div>
      {content}
    </div>
  );
}

function DropZoneColumn(props){
  var content = [];
  var topdivStyle = {
  position:"absolute",
  background: "linear-gradient(#99CEFAC1, #01CEFA00)",
  width: "19.4%",
  left: props.left,
//  border: "2px solid black",
  top:"615px",
  height:"65px",
}

  for(var i=0; i<props.length; i++){
    console.log(props.greenRow);
    if(i === 0){
      if(props.greenRow === "0"){
        console.log("setting");
        topdivStyle.background = "linear-gradient(#00FF00FF, #01CEFA00)"
      }
      content.push(<div style={topdivStyle} id="0" onDragEnter={props.onDragEnter} onDragLeave={props.onDragLeave}></div>)
    }else{
      var divStyle = {
        position:"absolute",
        background: "linear-gradient(#FFFFFF00, #99CEFAFF, #FFFFFF00)",
        width: "19.4%",
        left: props.left,
    //    border: "2px solid black",
        top:(i*125)+555,
        height:"125px",//this.state.backlogColumnStyle.height - 8,
        'border-radius':"15px",
        }
        if(props.greenRow === i + ""){
          console.log("setting");
          divStyle.background = "linear-gradient(#01CEFA00, #00FF00FF, #01CEFA00)"
        }
      content.push(<div style={divStyle} id={i} onDragEnter={props.onDragEnter} onDragLeave={props.onDragLeave}></div>)
    }
  }

  return(
    <div>{content}</div>
  );
}

function DropZones(props){
  var lengths = [];
  lengths = props.number;
  return(
    <div>
      <DropZoneColumn
        length={lengths[0]}
      left=".4%"
    greenRow={props.greenRow}
  onDragEnter={props.onDragEnter}
onDragLeave={props.onDragLeave}/>
      <DropZoneColumn
        length={lengths[1]}
      left="20.2%"
    greenRow={props.greenRow}
    onDragEnter={props.onDragEnter}
  onDragLeave={props.onDragLeave}/>
      <DropZoneColumn
        length={lengths[2]}
      left="40.4%"
    greenRow={props.greenRow}
    onDragEnter={props.onDragEnter}
  onDragLeave={props.onDragLeave}/>
    </div>
  );
}


function PBIBacklogDisplay(props){
  return(
    <div id="Backlog">
      <h1>{props.projectName}</h1>
    <div id="board">
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={props.column1}
        columnName="productbacklog"
        columnNumber="1"
        title="Product Backlog"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}
onDragExit={props.onDragExit}/>
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={props.column2}
        columnName="scrumbacklog"
        columnNumber="2"
        title="Scrum Backlog"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}
onDragExit={props.onDragExit}/>
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={props.column3}
        columnName="todo"
        columnNumber="3"
        title="To Do"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}
onDragExit={props.onDragExit}/>
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={props.column4}
        columnName="inprogress"
        columnNumber="4"
        title="In Progress"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}
onDragExit={props.onDragExit}/>
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={props.column5}
        columnName="done"
        columnNumber="5"
        title="Done"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}
onDragExit={props.onDragExit}/>
      </div>
    </div>
  );
}

class PBIBacklogForm extends Component {

  constructor(props) {
    super(props);
    //put in call to client toinstantiate
    this.state = {
      productbacklog:[{description:"This is another user story", size:"SMALL"}],
      scrumbacklog:[{description:"This is a user story", size:"SMALL"},{description:"Make Food", size:"LARGE"},{description:"This is a user story", size:"SMALL"},{description:"Make Food", size:"LARGE"}],
      todo:[{description:"Do some stuff", size:"SMALL"},{description:"Another user story", size:"LARGE"},{description:"Another user story", size:"LARGE"}],
      inprogress:[{description:"Stop being lazy", size:"SMALL"},{description:"Another user story", size:"LARGE"}],
      done:[{description:"Finish the project", size:"SMALL"},{description:"Another user story", size:"LARGE"}],
      isDragging:false,
      droppableColumnColor:"linear-gradient(#87CEFA00, #87CEFAC1, #87CEFA00)",
      drop2:"linear-gradient(#87CEFAC1, #87CEFA00)",
      droppableColumnBorderColor:"4px solid blue",
      backlogColumnStyle:{
        position:'absolute',
        width: '19.6%',
        height: '280px',
        border: '2px solid black',
        outline: '0',
        background: '#f2f2f2',
        'box-sizing': 'border-box',
        'border-radius': '10px',
      },
      greenRow:'',

    };

    this.updateBoardHeight = this.updateBoardHeight.bind(this);
    this.drag=this.drag.bind(this);
    this.drop=this.drop.bind(this);
    this.allowDrop=this.allowDrop.bind(this);
    this.dragexit=this.dragexit.bind(this);
    this.dragleave=this.dragleave.bind(this);
    this.dragenter=this.dragenter.bind(this);
  }

  updateBoardHeight(e){
    this.setState({backlogColumnStyle:{
      position:'absolute',
      width: '19.6%',
      height: e,
      border: '2px solid black',
      outline: '0',
      background: '#f2f2f2',
      'box-sizing': 'border-box',
      'border-radius': '10px',

    }});
  }

  dragover(e){
    this.setState({droppableColumnColor:"00220022"});
  }

  allowDrop(ev) {
      ev.preventDefault();
  }

  drag(ev) {
    this.setState({isDragging:true});
      ev.dataTransfer.setData("text", ev.target.id);
      ev.dataTransfer.setData("column",ev.target.className);
      ev.dataTransfer.setData("row", ev.target.id);
      console.log("Row = " +ev.target.id + " column = " + ev.target.className);
  }

  dragleave(e){
    e.preventDefault();
    console.log("dragging leave for ID " + e.target.id);
    this.setState({greenRow:''});
  }

  dragenter(e){
    e.preventDefault();
    console.log("dragging enter for ID " + e.target.id);
    this.setState({greenRow:e.target.id});
  }

  dragexit(ev){
    console.log("done dragging");
    this.setState({isDragging:false});
  }

  drop(ev) {
    ev.preventDefault();
    this.setState({isDragging:false});
        this.setState({droppableColumnColor:"linear-gradient(#87CEFA00, #87CEFAC1, #87CEFA00)"});
    console.log(ev.clientX + " XPos " + ev.clientY + " YPos ");
    var column = 0;
    column = parseInt(ev.dataTransfer.getData("column"),10);
    var x = ev.clientX;
    var item = {};
    var temp = [];
    var row = ev.dataTransfer.getData("row");
    switch (column) {
      case 1:
        var temp = this.state.productbacklog;
        item = temp[row];
        temp.splice(row,1);
        this.setState({productbacklog:temp});
        break;
      case 2:
        var temp = this.state.scrumbacklog;
        item = temp[row];
        temp.splice(row,1);
        this.setState({scrumbacklog:temp});
        break;
      case 3:
        var temp = this.state.todo;
        item = temp[row];
        temp.splice(row,1);
        this.setState({todo:temp});
        break;
      case 4:
        var temp = this.state.inprogress;
        item = temp[row];
        temp.splice(row,1);
        this.setState({inprogress:temp});
        break;
      case 5:
        var temp = this.state.done;
        item = temp[row];
        temp.splice(row,1);
        this.setState({done:temp});
        break;
      default:
    }

    if(x<260){
      var back = this.state.productbacklog;
      back.push(item);
      this.setState({productbacklog:back});
    }else if(x<500){
      var back = this.state.scrumbacklog;
      back.push(item);
      this.setState({scrumbacklog:back});
    }else if(x<750){
      var back = this.state.todo;
      back.push(item);
      this.setState({todo:back});
    }else if(x<1000){
      var back = this.state.inprogress;
      back.push(item);
      this.setState({inprogress:back});
    }else{
      var back = this.state.done;
      back.push(item);
      this.setState({done:back});
    }

    var y = ev.screenY;
    if(y>250){
      console.log("drop in row 1");
    }else if(y>500){
      console.log("drop in row 2");
    }else if(y>750){
      console.log("drop in row 3");
    }else if(y>1000){
      console.log("drop in row 4");
    }else if(y>1250){
      console.log("drop in row 5");
    }else{
      console.log("drop in row 0");
    }
    console.log("dropped " + y);

}


  render() {
    var columnLengths = [this.state.productbacklog.length +1, this.state.scrumbacklog.length + 1, this.state.todo.length + 1,
       this.state.inprogress.length + 1, this.state.done.length + 1];
    return (
      <div className="PBIBacklogDisplay">
          <PBIBacklogDisplay
            backlogColumnStyle={this.state.backlogColumnStyle}
            projectName={this.props.projectName}
            updateBoardHeight={this.updateBoardHeight}
            drag={this.drag}
            drop={this.drop}
            allowDrop={this.allowDrop}
            column1={this.state.productbacklog}
            column2={this.state.scrumbacklog}
            column3={this.state.todo}
            column4={this.state.inprogress}
            column5={this.state.done}
            onDragExit={this.dragexit}/>
          {console.log("wtf")}
            <DropZones
            number={columnLengths}
          greenRow={this.state.greenRow}
        onDragEnter={this.dragenter}
      onDragLeave={this.dragleave}/>
      </div>
    );
  }
}

export default PBIBacklogForm
