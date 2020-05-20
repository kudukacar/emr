import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Splash from "./splash";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders the splash page", () => {
  act(() => {
    render(<Splash />, container);
  });
  expect(container.textContent).toContain("HIPAA");
});