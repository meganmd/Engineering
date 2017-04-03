import React from 'react';
import ReactDOM from 'react-dom';
import PBIBacklogForm from './PBIBacklogForm';
//import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly (incomplete)', () => {
  const tree = renderer.create(
    <PBIBacklogForm project="notAProjectXXX3"
      handleLeavePBIBacklogForm={function(){}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
