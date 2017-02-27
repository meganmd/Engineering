import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LogInForm from './LogInForm'
import UserTable from './UserTable'
import AddUserForm from './AddUserForm'

beforeAll(() => {
  //this is incorrectly called
  addUser('mockName1', 'password1', function(){});
});

it('can find user', () => {
    //not sure what getUser is actually currently
    //returning. We could check username and
    //password independently?
    expect(getUser('mockName', cb).toBeDefined());
});

it('can set logged in', () => {
    setState({isLoggedIn: true, loggedInUser: user});
    expect(getUser('mockName', cb).toBeTruthy());
});

it('can set logged out', () => {
    setState({isLoggedIn: false, loggedInUser: user});
    expect(this.state.isLoggedIn.toBeFalsy());
});
