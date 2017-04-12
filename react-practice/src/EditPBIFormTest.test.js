import React from 'react';
import ReactDOM from 'react-dom';
import EditPBIForm from './EditPBIForm';
import Client from './Client';
import { mount } from 'enzyme';


test('EditPBIForm does not call updatePBI if the description AND role field is empty', () => {
  const updatePBI = jest.fn();
  var height = 0;
  var row = 0;
  var column = 0;
  var pbi = {description: '', role:'', functionality:'', value:'', acceptanceCriteria:'', estimate:''};
  const wrapper = mount(
    <EditPBIForm updatePBI={updatePBI} height={height} pbi={pbi} row={row} column={column}/>
  );

  wrapper.setState({description: '', role:'', functionality:'functionality', value:'value', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.savePBIButton');;
  p.simulate('click');
  expect(updatePBI).toHaveBeenCalledTimes(0);
});

test('EditPBIForm does not call updatePBI if the description AND functionality fields are empty', () => {
  const updatePBI = jest.fn();
  var height = 0;
  var row = 0;
  var column = 0;
  var pbi = {description: '', role:'', functionality:'', value:'', acceptanceCriteria:'', estimate:''};
  const wrapper = mount(
    <EditPBIForm updatePBI={updatePBI} height={height} pbi={pbi} row={row} column={column} />
  );

  wrapper.setState({description: '', role:'role', functionality:'', value:'value', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.savePBIButton');
  p.simulate('click');
  expect(updatePBI).toHaveBeenCalledTimes(0);
});

test('EditPBIForm does not call updatePBI if the description AND value field are empty', () => {
  const updatePBI = jest.fn();
  var height = 0;
  var row = 0;
  var column = 0;
  var pbi = {description: '', role:'', functionality:'', value:'', acceptanceCriteria:'', estimate:''};
  const wrapper = mount(
    <EditPBIForm updatePBI={updatePBI} height={height} pbi={pbi} row={row} column={column} />
  );

  wrapper.setState({description: '', role:'role', functionality:'functionality', value:'', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.savePBIButton');
  p.simulate('click');
  expect(updatePBI).toHaveBeenCalledTimes(0);
});

test('EditPBIForm does not call updatePBI if the description and acceptanceCriteria field is empty', () => {
  const updatePBI = jest.fn();
  var height = 0;
  var row = 0;
  var column = 0;
  var pbi = {description: '', role:'', functionality:'', value:'', acceptanceCriteria:'', estimate:''};
  const wrapper = mount(
    <EditPBIForm updatePBI={updatePBI} height={height} pbi={pbi} row={row} column={column} />
  );

  wrapper.setState({description: '', role:'role', functionality:'functionality', value:'value', acceptanceCriteria:'', estimate:'small'});
  const p = wrapper.find('.savePBIButton');
  p.simulate('click');
  expect(updatePBI).toHaveBeenCalledTimes(0);
});

test('EditPBIForm does not call updatePBI if the description is empty and estimate is unselected', () => {
  const updatePBI = jest.fn();
  var height = 0;
  var row = 0;
  var column = 0;
  var pbi = {description: '', role:'', functionality:'', value:'', acceptanceCriteria:'', estimate:''};
  const wrapper = mount(
    <EditPBIForm updatePBI={updatePBI} height={height} pbi={pbi} row={row} column={column} />
  );

  wrapper.setState({description: '', role:'role', functionality:'functionality', value:'value', acceptanceCriteria:'AC', estimate:'unselected'});
  const p = wrapper.find('.savePBIButton');
  p.simulate('click');
  expect(updatePBI).toHaveBeenCalledTimes(0);
});

test('EditPBIForm DOES call updatePBI if the description is filled,', () => {
  const updatePBI = jest.fn();
  var height = 0;
  var row = 0;
  var column = 0;
  var pbi = {description: '', role:'', functionality:'', value:'', acceptanceCriteria:'', estimate:''};
  const exit = jest.fn();
  const wrapper = mount(
    <EditPBIForm updatePBI={updatePBI} height={height} pbi={pbi} row={row} column={column} exit={exit}/>
  );

  wrapper.setState({description: 'desc', role:'', functionality:'', value:'', acceptanceCriteria:'', estimate:'unselected'});
  const p = wrapper.find('.savePBIButton');
  p.simulate('click');
  expect(updatePBI).toHaveBeenCalledTimes(1);
  expect(exit).toHaveBeenCalledTimes(1);
});

test('EditPBIForm DOES call updatePBI if the role, value and functionality (but not description), and acceptance criteria and estimate are filled', () => {
  const updatePBI = jest.fn();
  var height = 0;
  var row = 0;
  var column = 0;
  var pbi = {description: '', role:'', functionality:'', value:'', acceptanceCriteria:'', estimate:''};
  const exit = jest.fn();
  const wrapper = mount(
    <EditPBIForm updatePBI={updatePBI} height={height} pbi={pbi} row={row} column={column} exit={exit} />
  );

  wrapper.setState({description: '', role:'role', functionality:'functionality', value:'value', acceptanceCriteria:'AC', estimate:'small'});
  const p = wrapper.find('.savePBIButton');
  p.simulate('click');
  expect(updatePBI).toHaveBeenCalledTimes(1);
  expect(exit).toHaveBeenCalledTimes(1);
});
