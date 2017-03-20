import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LogInForm from './LogInForm';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import Client from './Client';

beforeAll(() => {
  Client.addUser('mockName1', 'password1', 'firstName1', 'lastName1', function(){});
});

it('addUser works and  getUser runs', user => {
  function callback(user) {
    expect(user).toBeDefined;
  }
  Client.getUser('mockName1', callback);
});

it('can check username', user => {
  function callback(user) {
    expect(user.username).toBe('mockName1');
    done();
  }
  Client.getUser('mockName1', callback);
});

it('can check password', user => {
  function callback(user) {
    expect(user.password).toBe('password1');
    done();
  }
  Client.getUser('mockName1', callback);
});

it('can check firstName', user => {
  function callback(user) {
    expect(user.firstName).toBe('firstName1');
    done();
  }
  Client.getUser('mockName1', callback);
});

it('can check lastName', user => {
  function callback(user) {
    expect(user.lastName).toBe('lastName1');
    done();
  }
  Client.getUser('mockName1', callback);
});
