import React from 'react';
import Header from '../client/components/Header';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Header snapshot test', () => {
  const component = shallow(<Header />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});
