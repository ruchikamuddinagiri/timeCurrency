import React from 'react';
import renderer from 'react-test-renderer';
import MyComponent from './MyComponent';
import LoginForm from './pages/LoginForm'
test('MyComponent renders correctly', () => {
  const tree = renderer.create(<LoginForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
