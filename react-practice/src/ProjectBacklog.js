import React, { Component } from 'react';
import Client from './Client';
import ProductBacklogForm from './ProductBacklogForm';
import Sprint from './Sprint';

class ProjectBacklog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:"510",
      productBacklog:['user story one', 'user story two', 'user story three'],
      sprints:[[['sprint 1 item 1'],['sprint 1 item 2'],['sprint 1 item 3'],['sprint 1 item 4']]]
    };
    this.pushToSprint = this.pushToSprint.bind(this);
    this.moveProductBacklog = this.moveProductBacklog.bind(this);
  }

  pushToSprint(){
    //use an if statement to test and make sure criteria is correct
    console.log("pushing");
    var sprints = this.state.sprints;
    var productBacklog = this.state.productBacklog;
    sprints[0][0].push(productBacklog.shift());
    this.setState({'productBacklog':productBacklog, 'sprints':sprints});
  }

  move(sprintNumber, fromRow, fromColumn, toRow, toColumn){

  }

  moveProductBacklog(from, to){
    console.log("moving pbiRow");
    var items = this.state.productBacklog;
    var item = items.splice(from,1);
    items.splice(to,0,item);
    this.setState({'productBacklog':items});
  }

render(){
  return (
    <div className="projectBacklog">
      <ProductBacklogForm
      height={this.state.height}
      items={this.state.productBacklog}
      pushToSprint={this.pushToSprint}
      moveProductBacklog={this.moveProductBacklog}/>
      
      <Sprint
      items={this.state.sprints[0]}/>
    </div>
  );}

}

export default ProjectBacklog
