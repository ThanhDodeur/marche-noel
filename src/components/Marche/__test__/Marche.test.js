import React from 'react';
import { render, act } from '@testing-library/react';
import Marche from '../Marche.js';

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

test('renders without crashing', () => {
  render(<Marche />);
});

test('renders the nav-bar', () => {
  const { getAllByRole } = render(<Marche />);
  const buttons = getAllByRole('button');
  expect(buttons).toHaveLength(8);
});

test('renders the main data agregate boxes', () => {
  const { getByText } = render(<Marche />);
  expect(getByText(/Bénéfices/, {selector: 'h3'}));
  expect(getByText(/Statistiques/, {selector: 'h3'}));
});

test('opens the accounting when clicking the accounting button', () => {
  const { container, getByRole } = render(<Marche />);
  const button = getByRole('button', {name: 'Comptabilité'});

  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const inputs = container.querySelectorAll('input');
  expect(inputs).toHaveLength(10);
});

test('opens the help menu', () => {
  const { getByRole, getByText } = render(<Marche />);
  const button = getByRole('button', {name: 'Aide'});

  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  getByText(/Format accepté/);
});

test('opens the Vendredi page', () => {
  const { getByRole } = render(<Marche />);
  const button = getByRole('button', {name: 'Vendredi'});

  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
});