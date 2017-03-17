import React from 'react';
import ReactDOM from 'react-dom';
import LogInForm from './LogInForm';
import Client1 from './Client';

beforeAll(() => {
  Client1.addUser('mockName1', 'password1', 'firstName1', 'lastName1', function(){});
});

// it('can register unique username', () => {
//   // expect(LogInForm.state.registering).toBeFalsy;
//   // LogInForm.handleRegisterClick();
//   // expect(LogInForm.state.registering).toBeTruthy;
//   done();
// });
