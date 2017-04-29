import React from 'react';
import ReactDOM from 'react-dom';
import ProjectTable from './ProjectTable'
import Client from './Client';
import { mount } from 'enzyme';

//how does projectTable get user?

test('Clicking a tableRow calls fetchProject once', () => {



  const wrapper = mount(
    <ProjectTable />
  );
  wrapper.fetchProject = jest.fn();

Client.getProjectsByUser("user1",(projects)=>{
    wrapper.setState(projects:projects)
  });
  const p = wrapper.find('row0');
  p.simulate('click');
  expect(wrapper.fetchProject).toHaveBeenCalledTimes(1);
})


// test('Client gets proper project', () => {
//   Client.getProjectsByUser = jest.fn();
//
//   const wrapper = mount(
//     <ProjectTable />
//   );
//
//   Client.getProjectsByUser.mockImplementationOnce(user1, projects => ({
//       expect(projects[0].name.toBe('somePRoject'));
//   }));
//
//
// });
