import React from 'react';
import ReactDOM from 'react-dom';
import InvitedProjectsTableForm from './InvitedProjectsTableForm'
import Client from './Client';
import { mount } from 'enzyme';

test('InvitedProjectsTableForm does call the internal function of acceptInvitation if the accept button is pushed', () => {
  var internalFunction = jest.fn();
  var acceptInvitation = jest.fn();
  acceptInvitation.mockImplementationOnce((project,user,updateTables) => {return internalFunction});
  var projects = [{name: "someName", role: "someRole", description: "someDescription"}]
  const wrapper = mount(
    <InvitedProjectsTableForm user={null}
      projects={projects}
      accept={acceptInvitation}
      reject={function(){}}
      updateTables={function(){}} />
  );

  const p = wrapper.find('#acceptProjectInvitationButton');
  p.simulate('click');
  expect(internalFunction).toHaveBeenCalledTimes(1);
});

test('InvitedProjectsTableForm does call the internal function of rejectInvitation if the reject button is pushed', () => {
  var internalFunction = jest.fn();
  var rejectInvitation = jest.fn();
  rejectInvitation.mockImplementationOnce((project,user,updateTables) => {return internalFunction});
  var projects = [{name: "someName", role: "someRole", description: "someDescription"}]
  const wrapper = mount(
    <InvitedProjectsTableForm user={null}
      projects={projects}
      accept={function(){}}
      reject={rejectInvitation}
      updateTables={function(){}} />
  );

  const p = wrapper.find('#rejectProjectInvitationButton');
  p.simulate('click');
  expect(internalFunction).toHaveBeenCalledTimes(1);
});
