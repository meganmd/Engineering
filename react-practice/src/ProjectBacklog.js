import React, { Component } from 'react';
import Client from './Client';
import ProductBacklogForm from './ProductBacklogForm';
import Sprint from './Sprint';

class ProjectBacklog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height:"510",
    };

  }

render(){

  return (
    <div className="projectBacklog">
      <ProductBacklogForm
      height={this.state.height}/>
      <Sprint/>
    </div>
  );}

}

export default ProjectBacklog
