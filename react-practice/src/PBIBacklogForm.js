import React, { Component } from 'react';


function GetCardsForColumn(props) {
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
    content.push(<div id={i} className={props.columnName}  style={divStyle} draggable="true" onDragEnd={props.onDragExit} onDragStart={props.drag}><br/>{userStories[i].description}<br/>Size: {userStories[i].size}</div>);
  }

  return(
    <div id={props.columnName} className="999" style={props.backlogColumnStyle} onDrop={props.drop} onDragOver={props.allowDrop}>
      <div id="title">{props.title}</div>
      {content}
    </div>
  );
}

function DropZoneColumn(props){
  var content = [];

  var topdivStyle = {
  position:"absolute",
  background: "linear-gradient(#99CEFAFF, #FFFFFF00)",
  width: "19.4%",
  left: props.left,
  top:"615px",
  height:"50px",
}

  for(var i=0; i<props.length; i++){
    if(i === 0){
      if(props.greenRow === "0" && props.isGreen == true){
        topdivStyle.background = "linear-gradient(#00FF00FF, #01CEFA00)"
      }
      content.push(<div style={topdivStyle} id="0" className={props.columnName} onDragOver={props.allowDrop} onDrop={props.drop} onDragEnter={props.onDragEnter} onDragLeave={props.onDragLeave}></div>)
    }else{
      var divStyle = {
        position:"absolute",
        background: "linear-gradient(#FFFFFF00, #99CEFAFF, #FFFFFF00)",
        width: "19.4%",
        left: props.left,
    //    border: "2px solid black",
        top:(i*125)+555,
        height:"100px",//this.state.backlogColumnStyle.height - 8,
        'border-radius':"15px",
        }
        if(props.greenRow === i + "" && props.isGreen == true){
          divStyle.background = "linear-gradient(#01CEFA00, #00FF00FF, #01CEFA00)"
        }
      content.push(<div style={divStyle} id={i} className={props.columnName} onDragOver={props.allowDrop} onDrop={props.drop} onDragEnter={props.onDragEnter} onDragLeave={props.onDragLeave}></div>)
    }
  }

  return(
    <div>{content}</div>
  );
}

function getGreenColumn(e){
  var retValue = [false,false,false,false,false];
  if(e==="productbacklog"){
    retValue[0] = true;
    return retValue;
  }else if(e==="scrumbacklog"){
      retValue[1] = true;
      return retValue;
  }else if(e==="todo"){
      retValue[2] = true;
      return retValue;
  }else if(e==="inprogress"){
      retValue[3] = true;
      return retValue;
  }else if(e==="done"){
      retValue[4] = true;
      return retValue;
    }
    return retValue;
}

function DropZones(props){
  var lengths = [];
  var greenColumn = getGreenColumn(props.greenColumn);

  lengths = props.number;
  return(
    <div>
      <DropZoneColumn
        length={lengths[0]}
      left=".4%"
    greenRow={props.greenRow}
  onDragEnter={props.onDragEnter}
onDragLeave={props.onDragLeave}
isGreen={greenColumn[0]}
columnName="productbacklog"
onDragOver={props.onDragOver}
allowDrop={props.allowDrop}
drop={props.drop}/>
      <DropZoneColumn
        length={lengths[1]}
      left="20.4%"
    greenRow={props.greenRow}
    onDragEnter={props.onDragEnter}
  onDragLeave={props.onDragLeave}
isGreen={greenColumn[1]}
columnName="scrumbacklog"
onDragOver={props.onDragOver}
allowDrop={props.allowDrop}
drop={props.drop}/>
      <DropZoneColumn
        length={lengths[2]}
      left="40.4%"
    greenRow={props.greenRow}
    onDragEnter={props.onDragEnter}
  onDragLeave={props.onDragLeave}
isGreen={greenColumn[2]}
columnName="todo"
onDragOver={props.onDragOver}
allowDrop={props.allowDrop}
drop={props.drop}/>
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
      greenColumn:'todo',
    };

    this.updateBoardHeight = this.updateBoardHeight.bind(this);
    this.drag=this.drag.bind(this);
    this.drop=this.drop.bind(this);
    this.allowDrop=this.allowDrop.bind(this);
    this.dragexit=this.dragexit.bind(this);
    this.dragleave=this.dragleave.bind(this);
    this.dragenter=this.dragenter.bind(this);
    this.insert = this.insert.bind(this);
    this.remove = this.remove.bind(this);
    this.getStateByName = this.getStateByName.bind(this);
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

  allowDrop(ev) {
      ev.preventDefault();
  }

  drag(ev) {
    this.setState({isDragging:true});
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("column",ev.target.className);
    ev.dataTransfer.setData("row", ev.target.id);
  }

  dragleave(e){
    e.preventDefault();
    this.setState({greenRow:''});
    this.setState({greenColumn:''});
  }

  dragenter(e){
    e.preventDefault();
    this.setState({greenRow:e.target.id});
    this.setState({greenColumn:e.target.className});
  }

  dragexit(ev){
    this.setState({isDragging:false});
  }

  drop(ev) {
    ev.preventDefault();
    console.log("dropping\nRemoving from Column "+ev.dataTransfer.getData('column') + " row " + ev.dataTransfer.getData('row') + " to column " + ev.target.className + " row " + ev.target.id);
    this.setState({greenRow:''});
    this.setState({greenColumn:''});
    var pbi = this.remove(ev.dataTransfer.getData('row'),ev.dataTransfer.getData('column'));
    this.insert(ev.target.id,ev.target.className,pbi);
}

insert(row, column, pbi){
  //change to allow multiple columns
  var backlogArray = this.getStateByName(column);
  backlogArray.splice(row,0,pbi);
  this.setState({[column]:backlogArray});
  console.log("done inserting");
}

remove(row,column){
  console.log("start removing");
  var backlogArray = this.getStateByName(column);
  var returnValue = backlogArray[row];
  backlogArray.splice(row,1);
  this.setState({[column]:backlogArray});
  console.log("done removing");
  return returnValue;
}

getStateByName(name){
  if(name==="productbacklog"){
    return this.state.productbacklog;
  }else if(name==="scrumbacklog"){
    return this.state.scrumbacklog;
  }else if(name==="todo"){
    return this.state.todo;
  }else if(name==="inprogress"){
    return this.state.inprogress;
  }else if(name==="done"){
    return this.state.done;
  }
  return "error";
}


  render() {
    var columnLengths = [this.state.productbacklog.length +1, this.state.scrumbacklog.length + 1, this.state.todo.length + 1,
       this.state.inprogress.length + 1, this.state.done.length + 1];
       var content;
       if(this.state.isDragging === true){
         content = <DropZones
                     number={columnLengths}
                     greenRow={this.state.greenRow}
                     greenColumn={this.state.greenColumn}
                     onDragEnter={this.dragenter}
                     onDragLeave={this.dragleave}
                     allowDrop={this.allowDrop}
                     drop={this.drop}/>;
       }
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
{content}
         </div>
    );
  }
}

export default PBIBacklogForm
