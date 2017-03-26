import React from 'react';
import ReactDOM from 'react-dom';
import CreateProjectForm from './CreateProjectForm'
import Client from './Client';
import { mount } from 'enzyme';

//how does projectTable get user?

test('Clicking a tableRow calls fetchProject once', () => {
  jest.mock('./Client');
  const foo = require('./Client');
  foo.getProject = jest.fn();

  const wrapper = mount(
    <ProjectTable />
  );

  const p = wrapper.find('row1');
  p.simulate('click');
  expect(foo.getProject).toHaveBeenCalledTimes(1);
});


test('Clicking a tableRow returns correct project', () => {

  );
});
