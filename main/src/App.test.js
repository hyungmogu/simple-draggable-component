import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';
import Draggable from './components/Draggable';
import Box from './components/Box';


test('renders draggable component', () => {
  let expected = 1;
  let notExpected = 2;

  const { container } = render(<App/>);
  expect(container.querySelectorAll('.draggable-area')).toHaveLength(expected);
  expect(container.querySelectorAll('.draggable-area')).not.toHaveLength(notExpected);
});

test('renders draggable component with correct dimension', () => {
  const { container } = render(<Draggable/>);
  document.body.appendChild(container);
  let e = document.querySelector('.draggable-area');

  expect(e).toHaveStyle({width: "500px", height: "500px"});
});

test('renders draggable components with position set as relative', () => {
  const { container } = render(<Draggable/>);
  document.body.appendChild(container);
  let e = document.querySelector('.draggable-area');

  expect(e).toHaveStyle({position: "relative"});
});
