import React from 'react';
import ReactDOM from 'react-dom';
import CreateTaskForm from './CreateTaskForm'
import Client from './Client';
import { mount } from 'enzyme';


test('Clicking a create task calls addTask once', () => {

  Client.getTotalPBIPercentage = jest.fn();
  Client.addTask = jest.fn();
  var userStory = [{id: "someName", username: "useruseruser"}]
  const wrapper = mount(
    <CreateTaskForm
    userStory={userStory}
    />
  );

  wrapper.setState({taskDescription: 'description', assignedMember: '', percentage: 0, errorMessage: ''});
  const p = wrapper.find('.createTaskButton');
  p.simulate('click');
  expect(Client.addTask).toHaveBeenCalledTimes(1);

})

test('fails for negative percentage', () => {

  Client.getTotalPBIPercentage = jest.fn();
  Client.addTask = jest.fn();

  var userStory = [{id: "someName", username: "useruseruser"}]
  const wrapper = mount(
    <CreateTaskForm
    userStory={userStory}
    />
  );

  wrapper.setState({taskDescription: 'nimrod', assignedMember: '', percentage: -10, errorMessage: ''});
  const p = wrapper.find('.createTaskButton');
  p.simulate('click');
  expect(wrapper.errorMessage).toBe('Enter a valid percentage, between 0 and 100!');

})
