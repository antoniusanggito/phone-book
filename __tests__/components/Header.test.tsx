import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header element render', () => {
  it('should contains h1 title', () => {
    render(<Header />);

    const title = screen.getByRole('heading', { level: 1 });

    expect(screen.getByRole('banner')).toContainElement(title);
  });

  it('should have sticky style', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toHaveStyle('position: sticky');
  });
});
