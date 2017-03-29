import React from 'react';
import ReactDOM from 'react-dom';
import CreatePBIForm from './CreatePBIForm';
import Client from './Client';
import { mount } from 'enzyme';


test('createPBIForm does not call addPBI if the description AND role field is empty', () => {
  const addPBI = jest.fn();
  const wrapper = mount(
    <CreatePBIForm addPBI={addPBI} />
  );

  wrapper.setState({description: '', role:'', functionality:'functionality', value:'value', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.createPBIButton');
  p.simulate('click');
  expect(addPBI).toHaveBeenCalledTimes(0);
});

test('createPBIForm does not call addPBI if the description AND functionality fields are empty', () => {
  const addPBI = jest.fn();
  const wrapper = mount(
    <CreatePBIForm addPBI={addPBI} />
  );

  wrapper.setState({description: '', role:'role', functionality:'', value:'value', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.createPBIButton');
  p.simulate('click');
  expect(addPBI).toHaveBeenCalledTimes(0);
});

test('createPBIForm does not call addPBI if the description AND value field are empty', () => {
  const addPBI = jest.fn();
  const wrapper = mount(
    <CreatePBIForm addPBI={addPBI} />
  );

  wrapper.setState({description: '', role:'role', functionality:'functionality', value:'', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.createPBIButton');
  p.simulate('click');
  expect(addPBI).toHaveBeenCalledTimes(0);
});

test('createPBIForm does not call addPBI if the acceptanceCriteria field is empty', () => {
  const addPBI = jest.fn();
  const wrapper = mount(
    <CreatePBIForm addPBI={addPBI} />
  );

  wrapper.setState({description: 'desc', role:'role', functionality:'functionality', value:'value', acceptanceCriteria:'', estimate:'small'});
  const p = wrapper.find('.createPBIButton');
  p.simulate('click');
  expect(addPBI).toHaveBeenCalledTimes(0);
});

test('createPBIForm DOES call addPBI if the description (but not role, functionality, or value), and acceptance criteria are filled', () => {
  const addPBI = jest.fn();
  const leavePBIForm = jest.fn();
  const wrapper = mount(
    <CreatePBIForm addPBI={addPBI} leavePBIForm={leavePBIForm}/>
  );

  wrapper.setState({description: 'desc', role:'', functionality:'', value:'', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.createPBIButton');
  p.simulate('click');
  expect(addPBI).toHaveBeenCalledTimes(1);
  expect(leavePBIForm).toHaveBeenCalledTimes(1);
});

test('createPBIForm DOES call addPBI if the role, value and functionality (but not description), and acceptance criteria are filled', () => {
  const addPBI = jest.fn();
  const leavePBIForm = jest.fn();
  const wrapper = mount(
    <CreatePBIForm addPBI={addPBI} leavePBIForm={leavePBIForm} />
  );

  wrapper.setState({description: '', role:'role', functionality:'functionality', value:'value', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.createPBIButton');
  p.simulate('click');
  expect(addPBI).toHaveBeenCalledTimes(1);
  expect(leavePBIForm).toHaveBeenCalledTimes(1);
});
