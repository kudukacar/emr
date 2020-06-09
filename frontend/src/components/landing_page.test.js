import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from './landing_page';

test('renders the landing page', () => {
  const { getByText } = render(<LandingPage />);
  const linkElement = getByText(/HIPAA/i);
  expect(linkElement).toBeInTheDocument();
});
