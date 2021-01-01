import { render, screen } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';

import App from './App';

describe("When App component is loaded", () => {
  test('renders Draggable component', () => {
    render(<App/>);
    let res = screen.getAllByRole('draggable-area');

    expect(res).toHaveLength(1);
  });

  test('renders Draggable component with correct dimension', () => {
    render(<App/>);
    let res = screen.getByRole('draggable-area');

    expect(res).toHaveStyle({width: "500px", height: "500px"});
  });

  test('renders Draggable component with position set as relative', () => {
    render(<App/>);
    let res = screen.getByRole('draggable-area');

    expect(res).toHaveStyle({position: "relative"});
  });

  test('renders Box components with total count of 3', () => {
    render(<App/>);
    let res = screen.getAllByRole('box');

    expect(res).toHaveLength(3);
  });

  test('renders Box components with position set as absolute', () => {
    render(<App/>);
    let res = screen.getAllByRole('box')[0];

    expect(res).toHaveStyle({position: "absolute"});
  });
})

describe("When Box component is dragged", () => {
  test('renders a Box component with updated position if dropped inside of Draggable component', async () => {
    render(<App/>);
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

  test('renders a Box component with current position if dropped outside of Draggable component (left)', () => {
    render(<App/>);
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

  test('renders a Box component with current position if dropped outside of Draggable component (top)', () => {
    render(<App/>);
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


  test('renders a Box component with current position if dropped outside of Draggable component (right)', () => {
    render(<App/>);
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

  test('renders a Box component with current position if dropped outside of Draggable Component (diagonal)', () => {
    render(<App/>);
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