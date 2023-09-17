import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer element render', () => {
  it('should contain link', () => {
    render(<Footer />);

    const link = screen.getByRole('link');

    expect(screen.getByRole('contentinfo')).toContainElement(link);
  });
});
