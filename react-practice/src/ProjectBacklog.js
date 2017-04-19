import React, { Component } from 'react';
import Client from './Client';
import ProductBacklogForm from './ProductBacklogForm';

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
    </div>
  );}

}

export default ProjectBacklog
