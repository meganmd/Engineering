import React, { Component } from 'react';
import EditPBIForm from './EditPBIForm'

function GetCardsForColumn(props) {
  var userStories = props.project;
  var content = [];
  for (var i = 0; i < userStories.length; i++) {
    var divStyle = {
      position:"absolute",
      background: "#dfdfdf",
      'box-shadow': '0 0 4px 4px #666666',
      left: "5%",
      top: "50px",
      width: "90%",
      'min-height': "100px",
    //  'border-radius':"15px",
      columnColor: "#"
    }
    divStyle.top = (i*125)+75;
    if(divStyle.top > parseInt(props.backlogColumnStyle.height,10)){
      props.updateBoardHeight((i*125)+150);
    }
    //update the details about the user story we want displayed here
    content.push(<div key={i} id={i} className={props.columnName}  style={divStyle} draggable="true" onDragEnd={props.onDragExit} onDragStart={props.drag} onClick={props.onClick}><br/>{userStories[i].description}<br/>Size: {userStories[i].estimate}</div>);
  }

  return(
    <div id={props.columnName} className="999" style={props.backlogColumnStyle} onDrop={props.drop} onDragOver={props.allowDrop}>
      <div id="title"><h3>{props.title}</h3></div>
      {content}
    </div>
  );
}

function DropZoneColumn(props){
  var content = [];

  var topdivStyle = {
  position:"absolute",
  background: "linear-gradient(#99CEFA00, #FFFFFF00)",
  width: "19.4%",
  left: props.left,
  top:"140px",
  height:"50px",
}

  for(var i=0; i<props.length; i++){
    if(i === 0){
      if(props.greenRow === "0" && props.isGreen == true){
        topdivStyle.background = "linear-gradient(#00FF00FF, #00FF0000)"
      }
      content.push(<div style={topdivStyle} id="0" className={props.columnName} onDragOver={props.allowDrop} onDrop={props.drop} onDragEnter={props.onDragEnter} onDragLeave={props.onDragLeave}></div>)
    }else{
      var divStyle = {
        position:"absolute",
      //  background: "linear-gradient(#FFFFFF00, #99CEFA00, #FFFFFF00)",
        width: "19.4%",
        left: props.left,
    //    border: "2px solid black",
        top:(i*125)+90,
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
  var content = [];
    lengths = props.number;
  console.log("should be true yo - " +props.possibleDropColumns[0]);
  if(props.possibleDropColumns[0]===true){
    console.log("getting in here");
    content.push(<DropZoneColumn
            length={lengths[0]}
          left=".4%"
        greenRow={props.greenRow}
      onDragEnter={props.onDragEnter}
    onDragLeave={props.onDragLeave}
    isGreen={greenColumn[0]}
    columnName="productbacklog"
    onDragOver={props.onDragOver}
    allowDrop={props.allowDrop}
    drop={props.drop}/>);
  }
  if(props.possibleDropColumns[1]===true){
    content.push( <DropZoneColumn
            length={lengths[1]}
          left="20.4%"
        greenRow={props.greenRow}
        onDragEnter={props.onDragEnter}
      onDragLeave={props.onDragLeave}
    isGreen={greenColumn[1]}
    columnName="scrumbacklog"
    onDragOver={props.onDragOver}
    allowDrop={props.allowDrop}
    drop={props.drop}/>);
  }
  if(props.possibleDropColumns[2]===true){
    content.push(
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
);
  }
  if(props.possibleDropColumns[3]===true){
    content.push(<DropZoneColumn
      length={lengths[3]}
    left="60.4%"
    greenRow={props.greenRow}
    onDragEnter={props.onDragEnter}
    onDragLeave={props.onDragLeave}
    isGreen={greenColumn[3]}
    columnName="inprogress"
    onDragOver={props.onDragOver}
    allowDrop={props.allowDrop}
    drop={props.drop}/>);
  }
    if(props.possibleDropColumns[4]===true){
content.push(<DropZoneColumn
  length={lengths[4]}
left="80.4%"
greenRow={props.greenRow}
onDragEnter={props.onDragEnter}
onDragLeave={props.onDragLeave}
isGreen={greenColumn[4]}
columnName="done"
onDragOver={props.onDragOver}
allowDrop={props.allowDrop}
drop={props.drop}/>);
    }
  return(
    <div>
      {content}
    </div>
  );
}


function PBIBacklogDisplay(props){
  return(
    <div id="Backlog">
      <h1  id="projectTitleText">{props.projectName}</h1>
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
      onDragExit={props.onDragExit}
    onClick={props.onClick}/>
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
      onDragExit={props.onDragExit}
    onClick={props.onClick}/>
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
      onDragExit={props.onDragExit}
    onClick={props.onClick}/>
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
      onDragExit={props.onDragExit}
    onClick={props.onClick}/>
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
      onDragExit={props.onDragExit}
    onClick={props.onClick}/>
    </div>
    </div>
  );
}

class PBIBacklogForm extends Component {

  constructor(props) {
    super(props);
    //put in call to client toinstantiate
    this.state = {
      productbacklog:[{description:"This is another user story", estimate:"small"}],
      scrumbacklog:[{description:"This is a user story", estimate:"small"},{description:"Make Food", estimate:"large"},{description:"This is a user story", estimate:"small"},{description:"Make Food", estimate:"large"}],
      todo:[{description:"Do some stuff", estimate:"small"},{description:"Another user story", estimate:"large"},{description:"Another user story", estimate:"large"}],
      inprogress:[{description:"Stop being lazy", estimate:"small"},{description:"Another user story", estimate:"large"}],
      done:[{description:"Finish the project", estimate:"small"},{description:"Another user story", estimate:"large"}],
      isDragging:false,
      backlogColumnStyle:{
        position:'absolute',
        width: '19.6%',
        height: '280px',
  //      border: '2px solid black',
        outline: '0',
        background: "linear-gradient(-90deg , #DDDDDDDD, #DDDDDD11)",
      //  'box-sizing': 'border-box',
    //    'border-radius': '10px',
      },
      greenRow:'',
      greenColumn:'todo',
      possibleDropColumns: [true,true,true,true,true],
      editPBI:null,
      editPBIRow:'',
      editPBIColumn:'',
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
    this.getColumnNumberByName = this.getColumnNumberByName.bind(this);
    this.handlePBIClick = this.handlePBIClick.bind(this);
    this.exitEditPBI = this.exitEditPBI.bind(this);
    this.updateBacklog = this.updateBacklog.bind(this);
    //fetch the user stories from client and populate the state here.
  }

  updateBoardHeight(e){
    this.setState({backlogColumnStyle:{
      position:'absolute',
      width: '19.6%',
      height: e,
    //  border: '2px solid black',
      outline: '0',
      background: "linear-gradient(-90deg ,#DDDDDD99, #DDDDDDDD, #DDDDDD99)",
      'box-sizing': 'border-box',
//      'border-radius': '10px',

    }});
  }

  allowDrop(ev) {
      ev.preventDefault();
  }

  drag(ev) {

    var column = ev.target.className;
    var row = ev.target.id;
    ev.dataTransfer.setData("column", column);
    ev.dataTransfer.setData("row", row);
    var droppableColumns = [true,true,true,true,true];
  if(column==="productbacklog" && row==="0"){
    droppableColumns = [true,true,false,false,false];
  }else if(column==="productbacklog"){
    droppableColumns = [true,false,false,false,false];
  }else if(column==="todo" || column ==="inprogress" || column==="done"){
    droppableColumns = [false,false,true,true,true];
  }

   this.setState({isDragging:true,possibleDropColumns:droppableColumns});
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
    this.setState({greenRow:''});
    this.setState({greenColumn:''});
  }

  drop(ev) {
    ev.preventDefault();
    console.log("dropping\nRemoving from Column "+ev.dataTransfer.getData('column') + " row " + ev.dataTransfer.getData('row') + " to column " + ev.target.className + " row " + ev.target.id);
    this.setState({greenRow:''});
    this.setState({greenColumn:''});
    this.setState({isDragging:false});
    if(this.state.possibleDropColumns[this.getColumnNumberByName(ev.target.id)] === true || this.state.possibleDropColumns[this.getColumnNumberByName(ev.target.className)] === true){
      var pbi = this.remove(ev.dataTransfer.getData('row'),ev.dataTransfer.getData('column'));
      this.insert(ev.target.id,ev.target.className,pbi);
    }

    //insert for loop here to iterate over the two columns and update their row and column
}

handlePBIClick(e){
  console.log("PBIClicked at column " + e.target.className + " row " + e.target.id );
  var pbi = this.getStateByName(e.target.className)[e.target.id];
  console.log(pbi.description + "<- supposed to be a description");
  this.setState({editPBI:pbi, editPBIRow:e.target.id, editPBIColumn:e.target.className});
}

exitEditPBI(){
  this.setState({editPBI:null});
}

updateBacklog(newpbi,row,column){
    var pbi = this.getStateByName(column);
    pbi[row] = newpbi;
    this.setState({[column]: pbi});
}

insert(row, column, pbi){
  //change to allow multiple columns
  console.log("row = " + row +" column =" + column);
  var backlogArray = [];
  if(column==="999"){
    console.log(backlogArray);
    backlogArray = this.getStateByName(row);
    backlogArray.push(pbi);
    this.setState({[row]:backlogArray});
  }else{
    backlogArray = this.getStateByName(column);
    backlogArray.splice(row,0,pbi);
    this.setState({[column]:backlogArray});
  }
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
  console.log("state not found: "+ name);
  return "error";
}

getColumnNumberByName(name){
  if(name==="productbacklog"){
    return 0;
  }else if(name==="scrumbacklog"){
    return 1;
  }else if(name==="todo"){
    return 2;
  }else if(name==="inprogress"){
    return 3;
  }else if(name==="done"){
    return 4;
  }
  console.log("state not found: "+ name);
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
                     drop={this.drop}
                     possibleDropColumns={this.state.possibleDropColumns}/>;
       }
       var editPBIView;
       if(this.state.editPBI != null){
         console.log(" not empty-----------------------");
         editPBIView = <EditPBIForm
           exit={this.exitEditPBI}
           pbi={this.state.editPBI}
           updatePBI={this.updateBacklog}
           row={this.state.editPBIRow}
           column={this.state.editPBIColumn}
         />
       }else{
         console.log("UNDEFINED______________________");
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
            onDragExit={this.dragexit}
            onClick={this.handlePBIClick}/>
{content}
{editPBIView}
         </div>
    );
  }
}

export default PBIBacklogForm
