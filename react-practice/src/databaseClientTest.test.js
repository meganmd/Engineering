import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

beforeAll(() => {
  addUser(mockName1, password, function(){});
});

it('can find user', () => {
    //not sure what getUser is actually currently
    //returning. We could check username and
    //password independently?
    expect(getUser(mockName, cb).toBeDefined());
});

it('can set logged in', () => {
    this.setState({isLoggedIn: true, loggedInUser: user});
    expect(getUser(mockName, cb).toBeTruthy());
});

it('can set logged out', () => {
    this.setState({isLoggedIn: false, loggedInUser: user});
    expect(this.state.isLoggedIn.toBeFalsy());
});
