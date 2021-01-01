import { render, screen } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';

import App from './App';
import Draggable from './components/Draggable';
import Box from './components/Box';

describe("When the App component is loaded", () => {
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

  test('renders box components with total count of 3', () => {
    let expected = 3;
    let notExpected = 2;

    const { container } = render(<App/>);
    expect(container.querySelectorAll('.box')).toHaveLength(expected);
    expect(container.querySelectorAll('.box')).not.toHaveLength(notExpected); // sanity test
  });

  test('renders box components with position set as absolute', () => {
    const { container } = render(<Box/>);
    document.body.appendChild(container);
    let e = document.querySelector('.box');

    expect(e).toHaveStyle({position: "absolute"});
    expect(e).not.toHaveStyle({position: "relative"}); // sanity test
  });
})

describe("When Box component is dragged", () => {
  test('renders box with updated position if dropped position is inside draggable area', async () => {
    const { container } = render(<App/>);
    document.body.appendChild(container);
    let e = screen.getAllByRole("box")[0];

    Simulate.dragStart(e, {clientX: 0, clientY: 0});
    Simulate.dragEnd(e, {clientX: 120, clientY: 150});

    e = screen.getAllByRole("box")[0];
    let style = getComputedStyle(e);
    let resLeft = style["left"];
    let resTop = style["top"];

    expect(resLeft).toBe("120px");
    expect(resTop).toBe("150px");
  });

  test('renders box with current position if dropped position is outside of draggable area (left)', () => {
    const { container } = render(<App/>);
    document.body.appendChild(container);
    let e = screen.getAllByRole("box")[0];

    Simulate.dragStart(e, {clientX: 0, clientY: 0});
    Simulate.dragEnd(e, {clientX: -1, clientY: 0});

    e = screen.getAllByRole("box")[0];
    let style = getComputedStyle(e);
    let resLeft = style["left"];
    let resTop = style["top"];

    expect(resLeft).toBe("");
    expect(resTop).toBe("");
  });

  test('renders box with current position if dropped position is outside of draggable area (top)', () => {
    const { container } = render(<App/>);
    document.body.appendChild(container);
    let e = screen.getAllByRole("box")[0];

    Simulate.dragStart(e, {clientX: 10, clientY: 10});
    Simulate.dragEnd(e, {clientX: 10, clientY: 0});

    e = screen.getAllByRole("box")[0];
    let style = getComputedStyle(e);
    let resLeft = style["left"];
    let resTop = style["top"];

    expect(resLeft).toBe("");
    expect(resTop).toBe("");
  });


  test('renders box with current position if dropped position is outside of draggable area (right)', () => {
    const { container } = render(<App/>);
    document.body.appendChild(container);
    let e = screen.getAllByRole("box")[0];

    Simulate.dragStart(e, {clientX: 10, clientY: 10});
    Simulate.dragEnd(e, {clientX: 420, clientY: 10});

    e = screen.getAllByRole("box")[0];
    let style = getComputedStyle(e);
    let resLeft = style["left"];
    let resTop = style["top"];

    expect(resLeft).toBe("");
    expect(resTop).toBe("");
  });

  test('renders box with current position if dropped position is outside of draggable area (diagonal)', () => {
    const { container } = render(<App/>);
    document.body.appendChild(container);
    let e = screen.getAllByRole("box")[0];

    Simulate.dragStart(e, {clientX: 0, clientY: 0});
    Simulate.dragEnd(e, {clientX: 401, clientY: 401});

    e = screen.getAllByRole("box")[0];
    let style = getComputedStyle(e);
    let resLeft = style["left"];
    let resTop = style["top"];

    expect(resLeft).toBe("");
    expect(resTop).toBe("");
  });
});