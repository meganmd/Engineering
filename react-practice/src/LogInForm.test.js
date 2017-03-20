import React from 'react';
import ReactDOM from 'react-dom';
import LogInForm from './LogInForm';
import Client from './Client';

beforeAll(() => {
  Client.addUser('mockName1', 'password1', 'firstName1', 'lastName1', function(){});
});

// it('can register unique username', () => {
//   // expect(LogInForm.state.registering).toBeFalsy;
//   // LogInForm.handleRegisterClick();
//   // expect(LogInForm.state.registering).toBeTruthy;
//   done();
// });


// it('can register unique username', user => {
//   function callback(user) {
//     expect(user).toBeDefined;
//     done();
//   }
//   // How to do this!?!
//   LogInForm.handleUserChange('newUser1');
//   LogInForm.handleSubmitNewUserClick();
//   Client.getUser('newUser1',callback);
// });


it('knows that 2 and 2 make 4', () => {
   expect(2 + 2).toBe(4);
 });
