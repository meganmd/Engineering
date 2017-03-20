import React, { Component } from 'react';
import Client from './Client'

class CreatePBIForm extends Component {

  constructor(props) {
    super(props);
    this.state = {description:'',role: '', action:'', reason:'',
    acceptanceCriteria:'', estimate:''};

  }

  this.handleDescriptionChange(e){
    this.setState({description: e.target.value});
  }

  this.handleRoleChange(e){
    this.setState({role: e.target.value});
  }

  this.handleActionChange(e){
    this.setState({action: e.target.value});
  }

  this.handleReasonChange(e){
    this.setState({reason: e.target.value});
  }

  this.handleAcceptanceCriteriaChange(e){
    this.setState({acceptanceCriteria: e.target.value});
  }

  this.handleEstimateChange(e){
    this.setState({estimate: e.target.value});
  }
