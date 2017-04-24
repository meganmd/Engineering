import React, { Component } from 'react';
import Client from './Client'
import CreatePBIForm from './CreatePBIForm'

//------------------------------------------functions------------------------------------------------------------
function ColumnContents(props) {
  var content = [];
  for(var i=0;i<props.items.length; i++){
    var divStyle = {
      background: "#dfdfdf",'boxShadow': '0 0 4px 4px #666666',
      width: "95%", "marginBottom":"20px", "minHeight":"50px"};
    if(i===0){
        content.push(
          <div key={i} className={i} draggable="true"
          onDrop={props.drop} onDragOver={props.allowDrop}
          onDragStart={props.drag} style={divStyle}>
            <div id={i} onClick={props.openEditPBI}>
              {props.items[i].description}
            </div>
            <br/>
            <button onClick={props.pushToSprint} style={{width:"85%"}}>
              Push To Sprint
            </button>
          </div>);
    }else{
        content.push(
          <div key={i} id={i} className={i} style={divStyle} draggable="true"
            onDrop={props.drop} onDragOver={props.allowDrop}
            onDragStart={props.drag} onClick={props.openEditPBI}>
            {props.items[i].description}
          </div>);
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
      pbis:[],
      isDragging:false,
      addPBI: false
    };

    this.allowDrop = this.allowDrop.bind(this);
    this.drop = this.drop.bind(this);
    this.drag = this.drag.bind(this);
    this.openAddPBI = this.openAddPBI.bind(this);
    this.addPBIComplete = this.addPBIComplete.bind(this);
    this.exitAddPBI = this.exitAddPBI.bind(this);
    this.updatePBIs = this.updatePBIs.bind(this);
    this.addToSprintButton = this.addToSprintButton.bind(this);
    this.clickPBI = this.clickPBI.bind(this);
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
    console.log("from: " + ev.dataTransfer.getData('row'))
    var from = ev.dataTransfer.getData('row');
    var to = ev.target.className;
    var items = this.state.pbis;
    var item = items.splice(from,1);
    items.splice(to,0,item[0]);
    this.setState({pbis:items});
    for(var i = 0; i < this.state.pbis.length; i++){
      Client.movePBI(this.state.pbis[i].id, i, function(){});
    }
  }

  drag(ev) {
    ev.dataTransfer.setData("row", ev.target.className);
  }

  openAddPBI(){
    this.setState({addPBI: true});
  }

  addPBIComplete(){
    this.setState({addPBI:false});
    for(var i = 0; i < this.state.pbis.length; i++){
      var id = this.state.pbis[i].id;
      var priority = this.state.pbis[i].priority;
      //Move them all down 1 row
      Client.movePBI(id,priority+1,function(){});
    }
    this.exitAddPBI();
  }

  exitAddPBI(){
    this.setState({addPBI:false});
    this.updatePBIs();
  }

  updatePBIs(){
    Client.getProductBacklog(this.props.project.name, this.props.numSprints,(pbis) => {
      this.setState({pbis: pbis});
    })
  }

  addToSprintButton(){
    this.props.pushToSprint(this.state.pbis[0]);
  }

  clickPBI(e){
    // console.log("EDITING..." + e.target.id)
    this.props.openEditPBI(this.state.pbis[e.target.id]);
  }

  componentWillMount() {
    this.props.passUpFunction("productBacklogUpdate",this.updatePBIs);
    this.updatePBIs();
  }

  //------------------------------------- Class Return ----------------------------------------------------------------
render(){
  var addPBIView;
  if(this.state.addPBI){
    addPBIView = <CreatePBIForm
      projectName={this.props.project.name}
      exit={this.exitAddPBI}
      addPBIComplete={this.addPBIComplete}
      addPBI={Client.addPBI}
    />
  }
  return (
    <div className="ProductBacklogForm">
      <div id="title">
        <h3>"Product Backlog"</h3>
        <button className="addPBIButton" onClick={this.openAddPBI}>Add PBI</button>
      </div>
      <ColumnContents
        style={this.divStyle}
        items={this.state.pbis}
        pushToSprint={this.addToSprintButton}
        openEditPBI={this.clickPBI}
        drop={this.drop}
        allowDrop={this.allowDrop}
        drag={this.drag}/>
        {addPBIView}
    </div>
  );
}

}

export default ProductBacklogForm
