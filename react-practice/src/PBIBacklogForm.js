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
    }
    divStyle.top = (i*125)+35;
    if(divStyle.top > parseInt(props.backlogColumnStyle.height,10)){
      props.updateBoardHeight((i*125)+150);
    }
    content.push(<div style={divStyle} draggable="true" onDragStart={props.drag}><br/>{userStories[i].description}<br/>Size: {userStories[i].size}</div>);
  }
  return(
    <div id={props.columnName} style={props.backlogColumnStyle} onDrop={props.drop} onDragOver={props.allowDrop}>
      <div id="title">{props.title}</div>
      {content}
    </div>
  );
}


function PBIBacklogDisplay(props){
  //used only for testing layout as of now
  var example = [{description:"This is a user story", size:"SMALL"},{description:"Make Food", size:"LARGE"},{description:"This is a user story", size:"SMALL"},{description:"Make Food", size:"LARGE"}];
  var example1 = [{description:"Do some stuff", size:"SMALL"},{description:"Another user story", size:"LARGE"},{description:"Another user story", size:"LARGE"}];
  var example2 = [{description:"Stop being lazy", size:"SMALL"},{description:"Another user story", size:"LARGE"}];
  var example3 = [{description:"Finish the project", size:"SMALL"},{description:"Another user story", size:"LARGE"}];

  return(
    <div id="Backlog">
      <h1>{props.projectName}</h1>
    <div id="board">
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={example}
        columnName="productbacklog"
        columnNumber="1"
        title="Product Backlog"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}/>
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={example1}
        columnName="scrumbacklog"
        columnNumber="2"
        title="Scrum Backlog"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}/>
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={example2}
        columnName="todo"
        columnNumber="3"
        title="To Do"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}/>
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={example3}
        columnName="inprogress"
        columnNumber="4"
        title="In Progress"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}/>
      <GetCardsForColumn
        backlogColumnStyle={props.backlogColumnStyle}
        updateBoardHeight={props.updateBoardHeight}
        project={props.example4}
        columnName="done"
        columnNumber="5"
        title="Done"
      drag={props.drag}
    drop={props.drop}
  allowDrop={props.allowDrop}/>
      </div>
    </div>
  );
}

class PBIBacklogForm extends Component {

  constructor(props) {
    super(props);
    this.state = {example4:
      [{description:"This is another user story", size:"SMALL"}]
    };
    this.backlogColumnStyle = {
      position:'absolute',
      width: '19.6%',
      height: '280px',
      border: '2px solid black',
      outline: '0',
      background: '#f2f2f2',
      'box-sizing': 'border-box',
      'border-radius': '10px'
    }
    this.updateBoardHeight = this.updateBoardHeight.bind(this);
    this.drag=this.drag.bind(this);
    this.drop=this.drop.bind(this);
    this.allowDrop=this.allowDrop.bind(this);
  }

  updateBoardHeight(e){
    this.backlogColumnStyle.height = e;
  }

  allowDrop(ev) {
      ev.preventDefault();
  }

  drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
      console.log("we in here");
  }

  drop(ev) {
    console.log("dropped");
    var temp = this.state.example4;
    temp.push({description:"This is another user story", size:"SMALL"});
    this.setState({example4:temp});
  }

  render() {
    return (
      <div className="PBIBacklogDisplay">
          <PBIBacklogDisplay
            backlogColumnStyle={this.backlogColumnStyle}
            projectName={this.props.projectName}
            updateBoardHeight={this.updateBoardHeight}
            drag={this.drag}
            drop={this.drop}
            allowDrop={this.allowDrop}
            example4={this.state.example4}/>
      </div>
    );
  }
}

export default PBIBacklogForm
