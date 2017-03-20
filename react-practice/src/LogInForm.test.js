import React from 'react';
import ReactDOM from 'react-dom';
import LogInForm from './LogInForm';
import Client from './Client';
import { mount } from 'enzyme';

beforeAll(() => {
  Client.addUser('mockName1', 'password1', 'firstName1', 'lastName1', function(){});
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
