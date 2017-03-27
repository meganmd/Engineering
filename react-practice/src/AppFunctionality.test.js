import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly (incomplete)', () => {
  const tree = renderer.create(
    <App />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//Log-in log-out possibility
//this is more for testing out the app, should eventually be given its
//test file.
/*
it('can set logged in', () => {
    App.handleLogin({isLoggedIn: true, loggedInUser: 'mockName'});
    expect(Client1.getUser('mockName', cb).isLoggedIn.toBeTruthy());
});

it('can set logged out', () => {
    App.handleLogOut({isLoggedIn: false, loggedInUser: 'mockName'});
    expect(this.state.isLoggedIn.toBeFalsy());
});
*/
