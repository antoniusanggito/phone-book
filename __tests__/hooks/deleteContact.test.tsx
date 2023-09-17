import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import {
  MockDeleteContactComponent,
  deleteContactMock,
  errorDeleteContactMock,
  successDeleteContactMock,
} from '../../__mocks__/deleteContactMock';

describe('useDeleteContactMutation() hook call', () => {
  afterEach(() => {
    cleanup();
  });

  it('should delete and display feedback', async () => {
    render(
      <MockedProvider mocks={successDeleteContactMock} addTypename={false}>
        <MockDeleteContactComponent />
      </MockedProvider>
    );

    expect(
      screen.queryByText(`Deleted ${deleteContactMock.delete_contact_by_pk.id}`)
    ).not.toBeInTheDocument();

    const button = await screen.findByRole('button');
    userEvent.click(button);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(
      await screen.findByText(
        `Deleted ${deleteContactMock.delete_contact_by_pk.id}`
      )
    ).toBeInTheDocument();
  });

  it('should display only error when failed', async () => {
    render(
      <MockedProvider mocks={errorDeleteContactMock as any} addTypename={false}>
        <MockDeleteContactComponent />
      </MockedProvider>
    );

    const button = await screen.findByRole('button');
    userEvent.click(button);

    expect(await screen.findByText('An error occured')).toBeInTheDocument();
    expect(
      screen.queryByText(`Deleted ${deleteContactMock.delete_contact_by_pk.id}`)
    ).not.toBeInTheDocument();
  });
});
