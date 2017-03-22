import React, { Component } from 'react';

function GetCardsForColumn(props) {
  var idTags = ["a","b","c","d","e","f"];
  var indents = [];
  for (var i = 0; i < 6; i++) {
    var divStyle = {
      position:"absolute",
      background: "#bbbbbb",
      border: "2px solid black",
      left: "5%",
      top: "50px",
      width: "90%",
      'min-height': "100px",
      'border-radius':"15px"
    }
    divStyle.top = (i*125)+35;
    console.log(props.backlogColumnStyle.height+ "Height--------" +divStyle.top);
    if(divStyle.top > parseInt(props.backlogColumnStyle.height,10)){
      console.log("should be calling update");
      props.updateBoardHeight((i*125)+150);
    }
    console.log(props.backlogColumnStyle.height+ "Height--------" +divStyle.top);
    indents.push(<div /*className="card" id={idTags[i]}*/ style={divStyle}></div>);
  }
  return(
    <div id="productbacklog" style={props.backlogColumnStyle}>
      <div id="title">Product Backlog</div>
      {indents}
    </div>
  );

}

function PBIBacklogDisplay(props){
  console.log("got here");
  return(
    <div className="Backlog">
      <h1>{props.projectName}</h1>
    <div id="board" style={{width:"100%", height:"fill"}}>
      <GetCardsForColumn backlogColumnStyle={props.backlogColumnStyle}
      updateBoardHeight={props.updateBoardHeight}/>
      <div id="scrumbacklog" style={props.backlogColumnStyle}>
        <div id="title">Scrum Backlog</div>
      </div>
      <div id="todo" style={props.backlogColumnStyle}>
        <div id="title">To Do</div>
      </div>
      <div id="inprogress" style={props.backlogColumnStyle}>
        <div id="title">In Progress</div>
      </div>
      <div id="done" style={props.backlogColumnStyle}>
        <div id="title">Done</div>
      </div>
    </div>
    </div>
  );
}

class PBIBacklogForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.backlogColumnStyle = {
      position:'absolute',
      width: '19.6%',
      height: '200px',
      border: '2px solid black',
      outline: '0',
      background: '#f2f2f2',
      'box-sizing': 'border-box',
      'border-radius': '10px'
    }
    this.updateBoardHeight = this.updateBoardHeight.bind(this);
    //var example = [{description:"this is a user story", size:"small"},{description:"another user story", size:"large"}];
  }

  updateBoardHeight(e){
    console.log("updating here " + e);
    this.backlogColumnStyle.height = e;
  }

  render() {
    return (
      <div className="PBIBacklogDisplay">
          <PBIBacklogDisplay
            backlogColumnStyle={this.backlogColumnStyle}
          projectName={this.props.projectName}
        project={this.example}
      updateBoardHeight={this.updateBoardHeight}/>
      </div>
    );
  }
}

export default PBIBacklogForm
