import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

it('renders header', () => {
  render(<Footer />);

  const link = screen.getByRole('link');

  expect(screen.getByRole('contentinfo')).toContainElement(link);
});
