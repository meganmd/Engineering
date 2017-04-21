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
      sprints:[['sprint 1 item 1','sprint 1 item 2'],['sprint 2 item 1', 'sprint 2 item 2']]
    };

    this.pushToSprint = this.pushToSprint.bind(this);
  }

  pushToSprint(){
    //use an if statement to test and make sure criteria is correct
    console.log("pushing");
    var sprints = this.state.sprints;
    var productBacklog = this.state.productBacklog;
    sprints[0].push(productBacklog.shift());
    this.setState({'productBacklog':productBacklog, 'sprints':sprints});
  }

render(){

  return (
    <div className="projectBacklog">
      <ProductBacklogForm
      height={this.state.height}
      items={this.state.productBacklog}
      pushToSprint={this.pushToSprint}/>
      <Sprint/>
    </div>
  );}

}

export default ProjectBacklog
