import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import {
  MockAddContactComponent,
  addContactMock,
  errorAddContactMock,
  successAddContactMock,
} from '../../__mocks__/addContactMock';

describe('useAddContactMutation() hook call', () => {
  afterEach(() => {
    cleanup();
  });

  it('should add and display feedback', async () => {
    render(
      <MockedProvider mocks={successAddContactMock} addTypename={false}>
        <MockAddContactComponent />
      </MockedProvider>
    );

    expect(
      screen.queryByText(
        `Added ${addContactMock.insert_contact?.returning[0].id}`
      )
    ).not.toBeInTheDocument();

    const button = await screen.findByRole('button');
    userEvent.click(button);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(
      await screen.findByText(
        `Added ${addContactMock.insert_contact?.returning[0].id}`
      )
    ).toBeInTheDocument();
  });

  it('should display only error when failed', async () => {
    render(
      <MockedProvider mocks={errorAddContactMock} addTypename={false}>
        <MockAddContactComponent />
      </MockedProvider>
    );

    const button = await screen.findByRole('button');
    userEvent.click(button);

    expect(await screen.findByText('An error occured')).toBeInTheDocument();
    expect(
      screen.queryByText(
        `Added ${addContactMock.insert_contact?.returning[0].id}`
      )
    ).not.toBeInTheDocument();
  });
});
