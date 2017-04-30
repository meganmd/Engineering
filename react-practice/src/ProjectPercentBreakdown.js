import React, { Component } from 'react';
import Client from './Client';
import './ProjectPercentBreakdown.css';

function SprintDisplay(props) {
  var pbiDisplays = [];
  Object.keys(props.breakdown).forEach((key) => {
      pbiDisplays.push(
        <li key={key}>
          <PbiDisplay
            key={key}
            pbi={key}
            breakdown={props.breakdown[key]}
          />
        </li>
      );
  });
  return (
    <div className="sprintDisplay">
      <span className="sprintTitle">Sprint {props.sprint}</span>
      <ul className="pbiList">
        {pbiDisplays}
      </ul>
    </div>
  );
}

function PbiDisplay(props) {
  var memberContributions = [];
  props.breakdown.memberContributions.forEach((contribution) => {
      memberContributions.push(
        <li key={contribution.member}><span className="contributionDisplay">{contribution.member}: {contribution.percentComplete}%</span></li>
      );
  });
  return (
    <div className="pbiDisplay">
      <span className="storyTitle">User Story: {props.breakdown.description} {props.breakdown.percentComplete}%</span>
      <ul className="contributionList">{memberContributions}</ul>
    </div>
  )
}

class ProjectPercentBreakdown extends Component {

  constructor(props) {
    super(props);

    this.state={percentBreakdown:{}};
    Client.getWholeProjectBreakdown(this.props.project, (percentBreakdown) => {
       this.setState({percentBreakdown:percentBreakdown});
       //console.log(percentBreakdown);
     });
  };

  render() {

    var sprintDisplays = [];
    //console.log(Object.keys(this.state.percentBreakdown));
    Object.keys(this.state.percentBreakdown).forEach((key) => {
        sprintDisplays.push(
          <li key={key}>
            <SprintDisplay
              key={key}
              sprint={key}
              breakdown={this.state.percentBreakdown[key]}
            />
          </li>
        );
        //console.log(key, this.state.ProjectBreakdown[key]);
    });


    return (
      <div className="CreateProject" className="breakdownWindow" >
          <span className="breakdownTitle">Breakdown for {this.props.project}</span>
          <ul className="sprintList">{sprintDisplays}</ul>
          <button onClick={this.props.close}>Close</button>
      </div>
    );
  }

}

export default ProjectPercentBreakdown
