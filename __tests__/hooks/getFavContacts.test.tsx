import { render, screen, act, cleanup } from '@testing-library/react';
import {
  MockFavContactsComponent,
  errorFavContactsMock,
  favContactsMock,
  successFavContactsMock,
} from '../../__mocks__/favContactsMock';
import { MockedProvider } from '@apollo/client/testing';

const waitForData = () => new Promise((res) => setTimeout(res, 0));

describe('useGetFavContactsQuery() hook call', () => {
  afterEach(() => {
    cleanup();
  });

  it('should return correct data when successful', async () => {
    render(
      <MockedProvider mocks={successFavContactsMock} addTypename={false}>
        <MockFavContactsComponent />
      </MockedProvider>
    );

    await act(async () => {
      await waitForData();
    });

    expect(
      screen.getByText(favContactsMock.contact[0].first_name)
    ).toBeInTheDocument();
  });

  it('should return only error when failed', async () => {
    render(
      <MockedProvider mocks={errorFavContactsMock} addTypename={false}>
        <MockFavContactsComponent />
      </MockedProvider>
    );

    await act(async () => {
      await waitForData();
    });

    expect(screen.getByText('An error occured')).toBeInTheDocument();
    expect(
      screen.queryByText(favContactsMock.contact[0].first_name)
    ).not.toBeInTheDocument();
  });
});
