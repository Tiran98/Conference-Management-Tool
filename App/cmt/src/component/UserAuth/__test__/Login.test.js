import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { isTSAnyKeywod } from '@babel/types';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import TestRenderer from 'react-test-renderer';

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router><Login></Login></Router>, div);
});

// it("renders login correctly", () => {
//     render(<Router><Login></Login></Router>);
// });

it("matches snapshot", () => {
    const tree = TestRenderer.create(<Router><Login></Login></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});