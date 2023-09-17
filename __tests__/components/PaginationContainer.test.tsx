import { render, screen } from '@testing-library/react';
import MockPaginationContext from '../../__mocks__/context/MockPaginationProvider';
import PaginationContainer from '../../components/Contacts/PaginationContainer';
import { regContactsMock } from '../../__mocks__/regContactsMock';
import { GetRegContactsQuery } from '../../generated/graphql';

describe('PaginationContainer element render', () => {
  it('should disable nextBtn when no more data', async () => {
    render(
      <MockPaginationContext>
        <PaginationContainer dataReg={regContactsMock as GetRegContactsQuery} />
      </MockPaginationContext>
    );

    const prevBtn = screen.getByTestId('prevBtn');
    const nextBtn = screen.getByTestId('nextBtn');

    expect(prevBtn).toHaveAttribute('disabled');
    expect(nextBtn).toHaveAttribute('disabled');
  });

  // Add more test with other conditions
});
