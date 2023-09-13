import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

it('renders header', () => {
  render(<Header />);

  expect(screen.getByText('Contacts')).toBeInTheDocument();
});
