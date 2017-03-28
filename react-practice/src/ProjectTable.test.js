import React from 'react';
import ReactDOM from 'react-dom';
import ProjectTable from './ProjectTable'
import Client from './Client';
import { mount } from 'enzyme';

//how does projectTable get user?

test('Clicking a tableRow calls fetchProject once', () => {
  Client.getProject = jest.fn();

  const wrapper = mount(
    <ProjectTable />
  );

  const p = wrapper.find('row1');
  p.simulate('click');
  expect(Client.getProject).toHaveBeenCalledTimes(1);
});


test('Clicking a tableRow returns correct project', () => {

});
