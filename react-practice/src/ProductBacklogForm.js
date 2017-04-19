import React, { Component } from 'react';
import Client from './Client'

//------------------------------------------functions------------------------------------------------------------
function ColumnContents(props) {
  return(
    <div style={props.style}>

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
      background: "linear-gradient(-90deg ,#DDDDDD66, #DDDDDDDD, #DDDDDD66)"};
  }

//--------------------------------------------DND-------------------------------------------------------------
  allowDrop(ev) {
      ev.preventDefault();
  }

  drop(ev) {
    ev.preventDefault();
    console.log("dropping\nRemoving from Row " + ev.dataTransfer.getData('row') +" to row " + ev.target.id);
  }

  drag(ev) {
    ev.dataTransfer.setData("row", ev.target.id);
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
        style={this.divStyle}/>
    </div>
  );
}

}

export default ProductBacklogForm
