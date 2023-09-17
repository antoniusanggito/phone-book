import { render, screen, act, cleanup } from '@testing-library/react';
import {
  MockRegContactsComponent,
  errorRegContactsMock,
  regContactsMock,
  successRegContactsMock,
} from '../../__mocks__/regContactsMock';
import { MockedProvider } from '@apollo/client/testing';

const waitForData = () => new Promise((res) => setTimeout(res, 0));

describe('useGetRegContactsQuery() hook call', () => {
  afterEach(() => {
    cleanup();
  });

  it('should return correct data when successful', async () => {
    render(
      <MockedProvider mocks={successRegContactsMock} addTypename={false}>
        <MockRegContactsComponent />
      </MockedProvider>
    );

    await act(async () => {
      await waitForData();
    });

    expect(
      screen.getByText(regContactsMock.contact[0].first_name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(regContactsMock.contact_aggregate.aggregate.count)
    ).toBeInTheDocument();
  });

  it('should return only error when failed', async () => {
    render(
      <MockedProvider mocks={errorRegContactsMock} addTypename={false}>
        <MockRegContactsComponent />
      </MockedProvider>
    );

    await act(async () => {
      await waitForData();
    });

    expect(screen.getByText('An error occured')).toBeInTheDocument();
    expect(
      screen.queryByText(regContactsMock.contact[0].first_name)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(regContactsMock.contact_aggregate.aggregate.count)
    ).not.toBeInTheDocument();
  });
});
