import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

it('renders header', () => {
  render(<Header />);

  const title = screen.getByRole('heading', { level: 1 });

  expect(screen.getByRole('banner')).toHaveStyle('position: sticky');
  expect(screen.getByRole('banner')).toContainElement(title);
});
