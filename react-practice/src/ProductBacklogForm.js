import React, { Component } from 'react';
import Client from './Client'

//------------------------------------------functions------------------------------------------------------------
function ColumnContents(props) {
  var content = [];
  for(var i=0;i<props.items.length; i++){
    var divStyle = {
      background: "#dfdfdf",'boxShadow': '0 0 4px 4px #666666',
      width: "95%", "margin-bottom":"20px", "min-height":"50px"};
    if(i===0){
        content.push(<div key={i} className={i} draggable="true" onDrop={props.drop} onDragOver={props.allowDrop} onDragStart={props.drag} style={divStyle}> {props.items[i]} <br/> <button onClick={props.pushToSprint} style={{width:"85%"}}>Push To Sprint</button> </div>);
    }else{
        content.push(<div key={i} className={i} style={divStyle} draggable="true" onDrop={props.drop} onDragOver={props.allowDrop} onDragStart={props.drag}> {props.items[i]} </div>);
    }

  }
  return(
    <div style={props.style}>
      {content}
    </div>
  );
}

class ProductBacklogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents:[],
      isDragging:false,
    };

    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.isFirstStoryProductBacklogComplete = this.isFirstStoryProductBacklogComplete.bind(this);
    this.divStyle = {
      height: props.height,
      background: "linear-gradient(-90deg ,#DDDDDD66, #DDDDDDDD, #DDDDDD66)","padding":"7%"};
  }

//--------------------------------------------DND-------------------------------------------------------------
  allowDrop(ev) {
      ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    console.log("dropping height "+ ev.target.className);
    this.props.moveProductBacklog(ev.dataTransfer.getData('row'),ev.target.className);
  }

  drag(ev) {
    ev.dataTransfer.setData("row", ev.target.className);
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

  //------------------------------------- Class Return ----------------------------------------------------------------
render(){
  return (
    <div className="ProductBacklogForm">
      <div id="title"><h3>"Product Backlog"</h3></div>
      <ColumnContents
        style={this.divStyle}
        items={this.props.items}
        pushToSprint={this.props.pushToSprint}
        drop={this.drop}
        allowDrop={this.allowDrop}
        drag={this.drag}/>
    </div>
  );
}

}

export default ProductBacklogForm
