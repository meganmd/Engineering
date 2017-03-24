import React from 'react';
import ReactDOM from 'react-dom';
import CreateProjectForm from './CreateProjectForm'
import Client from './Client';
import { mount } from 'enzyme';

test('CreateProjectForm does not call getProject if projectTitle and descriptionField are empty', () => {
  jest.mock('./Client');
  const foo = require('./Client');
  foo.getProject = jest.fn();

  const wrapper = mount(
    <CreateProjectForm />
  );

  const p = wrapper.find('.createProjectButton');
  p.simulate('click');
  expect(foo.getProject).toHaveBeenCalledTimes(0);
});

test('CreateProjectForm DOES call getProject if projectTitle and descriptionField are not empty', () => {
  jest.mock('./Client');
  const foo = require('./Client');
  foo.getProject = jest.fn();

  const wrapper = mount(
    <CreateProjectForm />
  );

  wrapper.setState({projectTitle: 'someTitle', descriptionField: 'someDescription'});

  const p = wrapper.find('.createProjectButton');
  p.simulate('click');
  expect(foo.getProject).toHaveBeenCalledTimes(1);
});

test('CreateProjectForm does not call addProject if getProject returns the same name', () => {
  jest.mock('./Client');
  const foo = require('./Client');
  foo.getProject = jest.fn();
  foo.getProject.mockImplementationOnce((title,description,cb) => cb({projectTitle: 'someTitle',description: 'someDescription'}));
  foo.addProject = jest.fn();

  const wrapper = mount(
    <CreateProjectForm />
  );

  wrapper.setState({projectTitle: 'someTitle', descriptionField: 'someDescription'});

  const p = wrapper.find('.createProjectButton');
  p.simulate('click');
  expect(foo.addProject).toHaveBeenCalledTimes(0);
});

test('CreateProjectForm DOES call addProject if getProject returns the same name', () => {
  jest.mock('./Client');
  const foo = require('./Client');
  foo.getProject = jest.fn();
  foo.getProject.mockImplementationOnce((title,description,cb) => cb(null));
  foo.addProject = jest.fn();

  const wrapper = mount(
    <CreateProjectForm />
  );

  wrapper.setState({projectTitle: 'someTitle', descriptionField: 'someDescription'});

  const p = wrapper.find('.createProjectButton');
  p.simulate('click');
  expect(foo.addProject).toHaveBeenCalledTimes(1);
});
