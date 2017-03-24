import React from 'react';
import ReactDOM from 'react-dom';
import LogInForm from './LogInForm';
import Client from './Client';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

it('renders correctly (incomplete)', () => {
  const tree = renderer.create(
    <LogInForm />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('LogInForm calls getUser when loginbutton is clicked', () => {
  const getUser = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} />
  );

  const p = wrapper.find('.logInButton');
  p.simulate('click');
  expect(getUser).toHaveBeenCalledTimes(1);
});

test('LogInForm does not call handleLogIn when getUser returns nothing', () => {
  const getUser = jest.fn();
  getUser.mockReturnValueOnce({});
  const handleLogIn = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} handleLogIn={handleLogIn} />
  );

  const p = wrapper.find('.logInButton');
  p.simulate('click');
  expect(handleLogIn).toHaveBeenCalledTimes(0);
});

test('LogInForm does not call handleLogIn when getUser returns correct username, but incorrect password', () => {
  const getUser = jest.fn();
  getUser.mockReturnValueOnce({username: '', password:'fakePassword'});
  const handleLogIn = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} handleLogIn={handleLogIn} />
  );

  const p = wrapper.find('.logInButton');
  p.simulate('click');
  expect(handleLogIn).toHaveBeenCalledTimes(0);
});

test('LogInForm DOES call handleLogIn when getUser returns correct username and password', () => {
  const getUser = jest.fn();
  getUser.mockImplementationOnce((username,cb) => cb({username:'',password:''}));
  const handleLogIn = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} handleLogIn={handleLogIn} />
  );

  const p = wrapper.find('.logInButton');
  p.simulate('click');
  expect(handleLogIn).toHaveBeenCalledTimes(1);
});

test('LogInForm does not call getUser or addUser if the username and password fields are empty', () => {
  const getUser = jest.fn();
  const addUser = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} addUser={addUser} />
  );
  wrapper.setState({registering: true});
  const p = wrapper.find('.registerNewUserButton');
  p.simulate('click');
  expect(getUser).toHaveBeenCalledTimes(0);
  expect(addUser).toHaveBeenCalledTimes(0);
});

test('LogInForm DOES call getUser if the username and password fields are not empty', () => {
  const getUser = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} />
  );
  wrapper.setState({registering: true,userfield:'notEmpty', passwordfield: 'notEmpty'});
  const p = wrapper.find('.registerNewUserButton');
  p.simulate('click');
  expect(getUser).toHaveBeenCalledTimes(1);
});

test('LogInForm DOES call getUser if the username and password fields are not empty', () => {
  const getUser = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} />
  );
  wrapper.setState({registering: true,userfield:'notEmpty', passwordfield: 'notEmpty'});
  const p = wrapper.find('.registerNewUserButton');
  p.simulate('click');
  expect(getUser).toHaveBeenCalledTimes(1);
});

test('LogInForm does not call addUser if a user with the same username is returned by getUser', () => {
  const getUser = jest.fn();
  getUser.mockImplementationOnce((username,cb) => cb({username:'newUser',password:''}));
  const addUser = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} addUser={addUser}/>
  );
  wrapper.setState({registering: true,userfield:'newUser', passwordfield: 'newPass'});
  const p = wrapper.find('.registerNewUserButton');
  p.simulate('click');
  expect(addUser).toHaveBeenCalledTimes(0);
});

test('LogInForm DOES call addUser if an empty user is returned by getUser', () => {
  const getUser = jest.fn();
  getUser.mockImplementationOnce((username,cb) => cb({}));
  const addUser = jest.fn();
  const handleLogIn = jest.fn();
  const wrapper = mount(
    <LogInForm getUser={getUser} addUser={addUser} handleLogIn={handleLogIn}/>
  );
  wrapper.setState({registering: true,userfield:'newUser', passwordfield: 'newPass'});
  const p = wrapper.find('.registerNewUserButton');
  p.simulate('click');
  expect(addUser).toHaveBeenCalledTimes(1);
});
