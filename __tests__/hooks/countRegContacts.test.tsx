import { render, screen, act, cleanup } from '@testing-library/react';
import {
  MockCountRegContactsComponent,
  errorCountRegContactsMock,
  countRegContactsMock,
  successCountRegContactsMock,
} from '../../__mocks__/countRegContactsMock';
import { MockedProvider } from '@apollo/client/testing';

const waitForData = () => new Promise((res) => setTimeout(res, 0));

describe('useCountContactsQuery() hook call', () => {
  afterEach(() => {
    cleanup();
  });

  it('should return correct data when successful', async () => {
    render(
      <MockedProvider mocks={successCountRegContactsMock} addTypename={false}>
        <MockCountRegContactsComponent />
      </MockedProvider>
    );

    await act(async () => {
      await waitForData();
    });

    expect(
      screen.getByText(countRegContactsMock.contact_aggregate.aggregate.count)
    ).toBeInTheDocument();
  });

  it('should return error when failed', async () => {
    render(
      <MockedProvider mocks={errorCountRegContactsMock} addTypename={false}>
        <MockCountRegContactsComponent />
      </MockedProvider>
    );

    await act(async () => {
      await waitForData();
    });

    expect(screen.getByText('An error occured')).toBeInTheDocument();
  });
});
