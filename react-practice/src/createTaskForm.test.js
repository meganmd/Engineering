import React from 'react';
import ReactDOM from 'react-dom';
import CreateTaskForm from './CreateTaskForm'
import Client from './Client';
import { mount } from 'enzyme';


test('Clicking a create task calls addTask once', () => {

  Client.getTotalPBIPercentage = jest.fn();
  Client.addTask = jest.fn();

  const wrapper = mount(
    <CreateTaskForm/>
  );

  wrapper.setState({taskDescription: '', userStory: '', assignedMember: '', percentage: 0, errorMessage: ''});
  const p = wrapper.find('.createTaskButton');
  p.simulate('click');
  expect(Client.addTask).toHaveBeenCalledTimes(1);

})
