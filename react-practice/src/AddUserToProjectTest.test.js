import React from 'react';
import ReactDOM from 'react-dom';
import AddUserToProjectForm from './AddUserToProjectForm';
import Client from './Client';
import { mount } from 'enzyme';

test('AddUserToProjectForm does not call getUserFromProject or getUser if the username field is empty', () => {
  Client.getUserFromProject = jest.fn();
  Client.getUser = jest.fn();

  const wrapper = mount(
    <AddUserToProjectForm />
  );

  const p = wrapper.find('.inviteUserToProjectButton');
  p.simulate('click');
  expect(Client.getUser).toHaveBeenCalledTimes(0);
  expect(Client.getUserFromProject).toHaveBeenCalledTimes(0);
});

test('AddUserToProjectForm DOES call getUser if username field is not empty, but does not call getUserFromProject if getUser returns empty', () => {
  Client.getUserFromProject = jest.fn();
  Client.getUser = jest.fn();
  Client.getUser.mockImplementationOnce((username, cb) => cb({}));

  const wrapper = mount(
    <AddUserToProjectForm />
  );

  wrapper.setState({username: 'someUser'});

  const p = wrapper.find('.inviteUserToProjectButton');
  p.simulate('click');
  expect(Client.getUser).toHaveBeenCalledTimes(1);
  expect(Client.getUserFromProject).toHaveBeenCalledTimes(0);
});

test('AddUserToProjectForm calls getUSerToProject if getUSer returns the same name but does not call addUserToProject if getUserFromProject returns the same name', () => {
  Client.getUser = jest.fn();
  Client.getUser.mockImplementationOnce((username, cb) => cb({username: 'someUser'}));
  Client.getUserFromProject = jest.fn();
  Client.getUserFromProject.mockImplementationOnce((username, projectTitle ,cb) => cb({username: 'someUser'}));
  Client.addUserToProject = jest.fn();

  const wrapper = mount(
    <AddUserToProjectForm />
  );

  wrapper.setState({username: 'someUser'});
  const p = wrapper.find('.inviteUserToProjectButton');
  p.simulate('click');
  expect(Client.getUser).toHaveBeenCalledTimes(1);
  expect(Client.getUserFromProject).toHaveBeenCalledTimes(1);
  expect(Client.addUserToProject).toHaveBeenCalledTimes(0);
});

test('AddUserToProjectForm DOES call addUserToProject if getUserFromProject returns an empty object', () => {
  Client.getUser = jest.fn();
  Client.getUser.mockImplementationOnce((username, cb) => cb({username: 'someUser'}));
  Client.getUserFromProject = jest.fn();
  Client.getUserFromProject.mockImplementationOnce((username, projectTitle ,cb) => cb({}));
  Client.addUserToProject = jest.fn();
  const handleAddUserComplete = jest.fn();

  const wrapper = mount(
    <AddUserToProjectForm handleAddUserComplete={handleAddUserComplete}/>
  );

  wrapper.setState({username: 'someUser'});
  const p = wrapper.find('.inviteUserToProjectButton');
  p.simulate('click');
  expect(Client.getUser).toHaveBeenCalledTimes(1);
  expect(Client.getUserFromProject).toHaveBeenCalledTimes(1);
  expect(Client.addUserToProject).toHaveBeenCalledTimes(1);
  expect(handleAddUserComplete).toHaveBeenCalledTimes(1);
});
