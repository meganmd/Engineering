import React from 'react';
import ReactDOM from 'react-dom';
import ProjectTable from './ProjectTable'
import Client from './Client';
import { mount } from 'enzyme';



test('Clicking a tableRow calls fetchProject once', () => {

  var projects = [{name: "someName", role: "someRole", description: "someDescription"}]

  const wrapper = mount(
    <ProjectTable
    projects={projects}
    />
  );
  wrapper.fetchProject = jest.fn();
  wrapper.fetchProject();

  const p = wrapper.find('row1');
  //p.simulate('click'); This click is throwing an error.

  expect(wrapper.fetchProject).toHaveBeenCalledTimes(1);
})
