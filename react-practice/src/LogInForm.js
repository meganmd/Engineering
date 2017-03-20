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
    <div className="loginForm">
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
    <div className="loginForm">
      <input type="text" placeholder="New Username..."
        onChange={props.handleUserChange}/><br />
      <input type="text" placeholder="New Password..." onChange={props.handlePasswordChange} /> <br />
      <input type="text" placeholder="First Name (optional)..." onChange={props.handleFirstNameChange} /><br />
      <input type="text" placeholder="Last Name (optional)..." onChange={props.handleLastNameChange} /><br />
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
    this.state = {userfield: '', passwordfield: '', firstNameField:'', lastNameField:'', errorMessage: '', registering: false};
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleSubmitNewUserClick = this.handleSubmitNewUserClick.bind(this);
    this.handleCancelRegisterClick = this.handleCancelRegisterClick.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  handleLoginClick() {
    this.props.getUser(this.state.userfield, (user) => {
      if (user == null || user.password != this.state.passwordfield){
        this.setState({errorMessage: 'Incorrect Username or Password'});
      } else{
        if(user.firstName != ''){
          this.props.handleLogIn(user.firstName);
        } else{
          this.props.handleLogIn(this.state.userfield);
        }
        this.setState({errorMessage: ''});
      }
    });

  }

  handleSubmitNewUserClick(){
    this.props.getUser(this.state.userfield, (user) => {
        if (user.username == this.state.userfield){
          this.setState({errorMessage: 'Username already taken'});
          return;
        }
        this.props.addUser(this.state.userfield,this.state.passwordfield,
          this.state.firstNameField,this.state.lastNameField);
        this.props.handleLogIn(this.state.userfield);
        this.setState({errorMessage: ''});
    });
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

  handleFirstNameChange(e){
    this.setState({firstNameField: e.target.value});
  }

  handleLastNameChange(e){
    this.setState({lastNameField: e.target.value});
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    var display = null;
    if (this.state.registering) {
      display = <RegisterDisplay
        handleUserChange={this.handleUserChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmitNewUserClick={this.handleSubmitNewUserClick}
        handleCancelRegisterClick={this.handleCancelRegisterClick}
        errorMessage={this.state.errorMessage}
        handleFirstNameChange={this.handleFirstNameChange}
        handleLastNameChange = {this.handleLastNameChange}/>
    } else {
      display = <LogInDisplay
        handleUserChange={this.handleUserChange}
        handlePasswordChange={this.handlePasswordChange}
        handleLoginClick={this.handleLoginClick}
        handleRegisterClick={this.handleRegisterClick}
        errorMessage={this.state.errorMessage}/>
    }
    return (
      <div className="loginForm">
          {display}
      </div>
    )
  }
}

export default LogInForm
