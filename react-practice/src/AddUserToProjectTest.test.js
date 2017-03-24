import React from 'react';
import ReactDOM from 'react-dom';
import AddUserToProjectForm from './AddUserToProjectForm';
import Client from './Client';
import { mount } from 'enzyme';

//UNFINISHED

test('AddUserToProjectForm does not call getUsersforProjects if the username field is empty', () => {
  jest.mock('./Client');
  const foo = require('./Client');
  foo.getUserForProject = jest.fn();
  
  const wrapper = mount(
    <AddUserToProjectForm />
  );

  const p = wrapper.find('.inviteUserToProjectButton');
  p.simulate('click');
  expect(foo.getUserForProject).toHaveBeenCalledTimes(0);
});
