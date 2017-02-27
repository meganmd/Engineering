import React, { Component } from 'react';

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function RegisterButton(props){
  return(
  <button onClick={props.onClick}>
    Register
  </button>
  )
}

function SubmitButton(props){
  return(
  <button onClick={props.onClick}>
    Submit
  </button>
  )
}

function BackButton(props){
  return(
  <button onClick={props.onClick}>
    Back
  </button>
  )
}

function LogInDisplay(props){
  return(
    <div>
      <input type="text" placeholder="Enter Username..."
        onChange={props.handleUserChange}/><br />
      <input type="text" placeholder="Enter Password..." onChange={props.handlePasswordChange} /> <br />
      <LoginButton onClick={props.handleLoginClick} />
      <RegisterButton onClick={props.handleRegisterClick} />
      <br/>
      <font color="red">{props.errorMessage}</font>
    </div>
  );
}

function RegisterDisplay(props){
  return(
    <div>
      <input type="text" placeholder="New Username..."
        onChange={props.handleUserChange}/><br />
      <input type="text" placeholder="New Password..." onChange={props.handlePasswordChange} /> <br />
      <BackButton onClick={props.handleCancelRegisterClick} />
      <SubmitButton onClick={props.handleSubmitNewUserClick} />
      <br/>
      <font color="red">{props.errorMessage}</font>
    </div>
  )
}

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {userfield: '', passwordfield: '', errorMessage: '', registering: false};
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleSubmitNewUserClick = this.handleSubmitNewUserClick.bind(this);
    this.handleCancelRegisterClick = this.handleCancelRegisterClick.bind(this);
  }

  handleLoginClick() {
  //EXAMPLE. We will probably want a different implementation to work with the database
   for(var i = 0; i < this.props.users.length; i++){
     if(this.props.users[i].username == this.state.userfield &&
       this.props.users[i].password == this.state.passwordfield){
       this.props.handleLogIn(this.state.userfield);
       this.setState({errorMessage: ''});
       return;
     }
   }
   this.setState({errorMessage: 'Incorrect Username or Password'})
  }

  handleSubmitNewUserClick(){
    //Example. We will probably want a different implementation to work with the database
    for(var i = 0; i < this.props.users.length; i++){
      if(this.props.users[i].username == this.state.userfield){
        this.setState({errorMessage: 'Username already taken'});
        return;
      }
    }
    this.props.addUser({username: this.state.userfield, password: this.state.passwordfield});
    this.props.handleLogIn(this.state.userfield);
    this.setState({errorMessage: ''});
  }

  handleRegisterClick(){
    this.setState({registering: true});
  }

  handleCancelRegisterClick(){
    this.setState({registering: false});
  }

  handleUserChange(e){
    this.setState({userfield: e.target.value});
  }

  handlePasswordChange(e){
    this.setState({passwordfield: e.target.value});
  }

  handleLogoutClick(){
    this.props.handleLogOut();
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    var display = null;
    if (this.state.registering) {
      display = <RegisterDisplay handleUserChange={this.handleUserChange} handlePasswordChange={this.handlePasswordChange}
        handleSubmitNewUserClick={this.handleSubmitNewUserClick} handleCancelRegisterClick={this.handleCancelRegisterClick} errorMessage={this.state.errorMessage}/>
    } else {
      display = <LogInDisplay handleUserChange={this.handleUserChange} handlePasswordChange={this.handlePasswordChange}
        handleLoginClick={this.handleLoginClick} handleRegisterClick={this.handleRegisterClick} errorMessage={this.state.errorMessage}/>
    }
    return (
      <div>
          {display}
      </div>
    )
  }
}

export default LogInForm
