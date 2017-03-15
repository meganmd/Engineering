import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LogInForm from './LogInForm';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import Client1 from './Client';

beforeAll(() => {
  Client1.addUser('mockName1', 'password1', 'firstName1', 'lastName1', function(){});
});

it('addUser works and  getUser runs', () => {
    expect(Client1.getUser('mockName1', function(){})).toBeDefined;
});

it('can check username', () => {
  function callback(user) {
    expect(user).toBe('mockname1');
    done();
  }
  Client1.getUser('mockName1', function(){});
})

it('can check password', () => {
  function callback(user) {
    expect(user).toBe('password1');
    done();
  }
  Client1.getUser('mockName1', function(){});
})

it('can check firstName', () => {
  function callback(user) {
    expect(user).toBe('firstName1');
    done();
  }
  Client1.getUser('mockName1', function(){});
})

it('can check lastName', () => {
  function callback(user) {
    expect(user).toBe('lastName1');
    done();
  }
  Client1.getUser('mockName1', function(){});
})
