import React from 'react';
import { render } from '@testing-library/react';
import Marche from '../Marche.js';

test('renders without crashing', () => {
  render(<Marche />);
});
