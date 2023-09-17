import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

it('header contains h1 title', () => {
  render(<Header />);

  const title = screen.getByRole('heading', { level: 1 });

  expect(screen.getByRole('banner')).toContainElement(title);
});

it('header is sticky', () => {
  render(<Header />);

  expect(screen.getByRole('banner')).toHaveStyle('position: sticky');
});
