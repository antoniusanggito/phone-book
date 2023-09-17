import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

it('footer contains link', () => {
  render(<Footer />);

  const link = screen.getByRole('link');

  expect(screen.getByRole('contentinfo')).toContainElement(link);
});
