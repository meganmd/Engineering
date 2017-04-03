import React, { Component } from 'react';

function LoginButton(props) {
  return (
    <button className="logInButton" onClick={props.onClick}>
      Login
    </button>
  );
}

function RegisterButton(props){
  return(
  <button className="switchToRegisteringButton" onClick={props.onClick}>
    Register
  </button>
  );
}

function SubmitButton(props){
  return(
  <button className="registerNewUserButton" onClick={props.onClick}>
    Submit
  </button>
  );
}

function BackButton(props){
  return(
  <button onClick={props.onClick}>
    Back
  </button>
  );
}

function LogInDisplay(props){
  return(
    <div className="loginForm">
      <input name="userfield" type="text" placeholder="Enter Username..."
        onChange={props.handleInputChange}/><br />
      <input name="passwordfield" type="text" placeholder="Enter Password..."
        onChange={props.handleInputChange} /> <br />
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
      <input name="userfield" type="text" placeholder="New Username..."
        onChange={props.handleInputChange}/><br />
      <input name="passwordfield" type="text" placeholder="New Password..."
        onChange={props.handleInputChange} /> <br />
      <input name="firstNameField" type="text"
        placeholder="First Name (optional)..."
        onChange={props.handleInputChange} /><br />
      <input name="lastNameField" type="text"
        placeholder="Last Name (optional)..."
        onChange={props.handleInputChange} /><br />
      <BackButton onClick={props.handleCancelRegisterClick} />
      <SubmitButton onClick={props.handleSubmitNewUserClick} />
      <br/>
      <font color="red">{props.errorMessage}</font>
    </div>
  );
}

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {userfield: '', passwordfield: '', firstNameField:'', lastNameField:'', errorMessage: '', registering: false};
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleSubmitNewUserClick = this.handleSubmitNewUserClick.bind(this);
    this.handleCancelRegisterClick = this.handleCancelRegisterClick.bind(this);
  }

  handleLoginClick() {
    this.props.getUser(this.state.userfield, (user) => {
      if (user === null || user.password !== this.state.passwordfield){
        this.setState({errorMessage: 'Incorrect Username or Password'});
      } else{
        this.props.handleLogIn(user);
        this.setState({errorMessage: ''});
      }
    });

  }

  handleSubmitNewUserClick(){
    if(this.state.userfield === '' || this.state.passwordfield === ''){
      this.setState({errorMessage: 'Must have a username and password'});
      return;
    }
    this.props.getUser(this.state.userfield, (user) => {
        if (user.username === this.state.userfield){
          this.setState({errorMessage: 'Username already taken'});
          return;
        }
        this.props.addUser(this.state.userfield,this.state.passwordfield,
          this.state.firstNameField,this.state.lastNameField);
        this.props.handleLogIn({
          username: this.state.userfield,
          firstName: this.state.firstNameField,
          lastName: this.state.lastNameField});
        this.setState({errorMessage: ''});
    });
  }

  handleRegisterClick(){
    this.setState({userfield: '', passwordfield: '', registering: true});
  }

  handleCancelRegisterClick(){
    this.setState({userfield: '', passwordfield: '', firstNameField: '', lastNameField: '', registering: false});
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    var display = null;
    if (this.state.registering) {
      display = <div id="RegisterBackground"><h1>Register</h1><RegisterDisplay
        handleInputChange={this.handleInputChange}
        handleSubmitNewUserClick={this.handleSubmitNewUserClick}
        handleCancelRegisterClick={this.handleCancelRegisterClick}
        errorMessage={this.state.errorMessage}/></div>
    } else {
      display = <div id="AppBackground"><h1>Sign in</h1><LogInDisplay
        handleInputChange={this.handleInputChange}
        handleLoginClick={this.handleLoginClick}
        handleRegisterClick={this.handleRegisterClick}
        errorMessage={this.state.errorMessage}/>
        </div>
    }
    return (
      <div className="loginForm">
          {display}
      </div>
    )
  }
}

export default LogInForm
