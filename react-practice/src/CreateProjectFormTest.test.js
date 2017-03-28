import React from 'react';
import ReactDOM from 'react-dom';
import CreateProjectForm from './CreateProjectForm'
import Client from './Client';
import { mount } from 'enzyme';

test('CreateProjectForm does not call getProject if projectTitle and descriptionField are empty', () => {
  Client.getProject = jest.fn();

  const wrapper = mount(
    <CreateProjectForm />
  );

  const p = wrapper.find('.createProjectButton');
  p.simulate('click');
  expect(Client.getProject).toHaveBeenCalledTimes(0);
});

test('CreateProjectForm DOES call getProject if projectTitle and descriptionField are not empty', () => {
  Client.getProject = jest.fn();
  const wrapper = mount(
    <CreateProjectForm />
  );

  wrapper.setState({projectTitle: 'someTitle', descriptionField: 'someDescription'});

  const p = wrapper.find('.createProjectButton');
  p.simulate('click');
  expect(Client.getProject).toHaveBeenCalledTimes(1);
});

test('CreateProjectForm does not call addProject if getProject returns the same name', () => {
  Client.getProject = jest.fn();
  Client.getProject.mockImplementationOnce((title,cb) => cb({name: 'someTitle',description: 'someDescription'}));
  Client.addProject = jest.fn();

  const wrapper = mount(
    <CreateProjectForm />
  );

  wrapper.setState({projectTitle: 'someTitle', descriptionField: 'someDescription'});

  const p = wrapper.find('.createProjectButton');
  p.simulate('click');
  expect(Client.addProject).toHaveBeenCalledTimes(0);
});

test('CreateProjectForm DOES call addProject and handleProjectComplete if getProject returns an empty object', () => {
  Client.getProject = jest.fn();
  Client.getProject.mockImplementationOnce((title,cb) => cb({}));
  Client.addProject = jest.fn();
  const handleProjectComplete = jest.fn();
  const wrapper = mount(
    <CreateProjectForm handleProjectComplete={handleProjectComplete}/>
  );

  wrapper.setState({projectTitle: 'someTitle', descriptionField: 'someDescription'});

  const p = wrapper.find('.createProjectButton');
  p.simulate('click');
  expect(Client.addProject).toHaveBeenCalledTimes(1);
  expect(handleProjectComplete).toHaveBeenCalledTimes(1);
});
