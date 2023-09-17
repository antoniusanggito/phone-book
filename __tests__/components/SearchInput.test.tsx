import { render, screen, waitFor } from '@testing-library/react';
import SearchInput from '../../components/Contacts/SearchInput';
import userEvent from '@testing-library/user-event';
import MockPaginationContext from '../../__mocks__/context/MockPaginationProvider';

global.scrollTo = jest.fn();

describe('SearchInput element render', () => {
  it('should update input value correctly', async () => {
    render(
      <MockPaginationContext>
        <SearchInput />
      </MockPaginationContext>
    );

    const input = screen.getByPlaceholderText('Search contact');
    expect(input).toHaveValue('');

    userEvent.type(input, 'john');

    await waitFor(() => {
      expect(input).toHaveValue('john');
    });
  });

  it('should display feedback after submit', async () => {
    render(
      <MockPaginationContext>
        <SearchInput />
      </MockPaginationContext>
    );

    const input = screen.getByPlaceholderText('Search contact');

    userEvent.type(input, 'john{enter}');

    expect(
      await screen.findByText('Showing results for "john"')
    ).toBeInTheDocument();
  });
});
