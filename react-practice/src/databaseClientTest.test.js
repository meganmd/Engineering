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

const testUser={
  username: 'mockName1',
  password: 'password1',
  firstName: 'firstName1',
  lastName: 'lastName1'
}

test('addUser works and  getUser runs', () => {
  return expect(Client.getUser('mockName1')).resolves.toMatchObject(testUser);
});
//
// it('can check username', user => {
//   function callback(user) {
//     expect(user.username).toBe('mockName1');
//     done();
//   }
//   Client.getUser('mockName1', callback);
// });
//
// it('can check password', user => {
//   function callback(user) {
//     expect(user.password).toBe('password1');
//     done();
//   }
//   Client.getUser('mockName1', callback);
// });
//
// it('can check firstName', user => {
//   function callback(user) {
//     expect(user.firstName).toBe('firstName1');
//     done();
//   }
//   Client.getUser('mockName1', callback);
// });
//
// it('can check lastName', user => {
//   function callback(user) {
//     expect(user.lastName).toBe('lastName1');
//     done();
//   }
//   Client.getUser('mockName1', callback);
// });
