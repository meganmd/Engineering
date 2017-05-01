import React from 'react';
import ReactDOM from 'react-dom';
import CreateTaskForm from './CreateTaskForm'
import Client from './Client';
import { mount } from 'enzyme';

//this test has an error currently
/*
test('Clicking a create task calls addTask once', () => {

  Client.getTotalPBIPercentage = jest.fn();
  Client.addTask = jest.fn();
  var userStory = [{id: "someName", username: "useruseruser"}]
  var members = [{id: "someName", username: "useruseruser"}]
  const wrapper = mount(
    <CreateTaskForm
    pbis={userStory}
    userStory={userStory}
    members={members}
    />
  );

  wrapper.setState({taskDescription: 'description', assignedMember: '', percentage: 0, errorMessage: ''});
  const p = wrapper.find('.createTaskButton');
  p.simulate('click');
  expect(Client.addTask).toHaveBeenCalledTimes(1);

})*/

test('fails for negative percentage', () => {

  Client.getTotalPBIPercentage = jest.fn();
  Client.addTask = jest.fn();

  var userStory = [{id: "someName", username: "useruseruser"}]
  var members = [{id: "someName", username: "useruseruser"}]
  const wrapper = mount(
    <CreateTaskForm
    pbis={userStory}
    userStory={userStory}
    members={members}
    />
  );

  wrapper.setState({taskDescription: 'nimrod', assignedMember: '', percentage: -10, errorMessage: 'huh?'});
  const p = wrapper.find('.createTaskButton');
  p.simulate('click');
 expect(Client.addTask).toHaveBeenCalledTimes(0);

})


test('fails for a percentage over one hundred', () => {

  Client.getTotalPBIPercentage = jest.fn();
  Client.addTask = jest.fn();

  var userStory = [{id: "someName", username: "useruseruser"}]
  var members = [{id: "someName", username: "useruseruser"}]
  const wrapper = mount(
    <CreateTaskForm
    pbis={userStory}
    userStory={userStory}
    members={members}
    />
  );

  wrapper.setState({taskDescription: 'nimrod', assignedMember: '', percentage: 500, errorMessage: 'huh?'});
  const p = wrapper.find('.createTaskButton');
  p.simulate('click');
 expect(Client.addTask).toHaveBeenCalledTimes(0);

})
