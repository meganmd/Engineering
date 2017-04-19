import React from 'react';
import ReactDOM from 'react-dom';
import ViewProjectsForm from './ViewProjectsForm';
import Client from './Client';
//import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly (incomplete)', () => {
  var fakeAcceptedProjects = [{name:"accepted1", role:"acrole1", description:"acdesc1"}, {name:"accepted2", role:"acrole2", description:"acdesc2"}];
  var fakeUnnaceptedProjects = [{name:"notAccepted", role:"notrole", description:"notDesc"}]
  Client.getUnacceptedProjectsByUser = jest.fn();
  Client.getUnacceptedProjectsByUser.mockImplementationOnce( (username, cb) => cb(fakeAcceptedProjects));
  Client.getAcceptedProjectsByUser = jest.fn();
  Client.getAcceptedProjectsByUser.mockImplementationOnce( (username, cb) => cb(fakeUnnaceptedProjects));
  var fakeUser = {username: 'stuff'}
  const tree = renderer.create(
    <ViewProjectsForm user={fakeUser} handleProjectSelected={function(){}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
