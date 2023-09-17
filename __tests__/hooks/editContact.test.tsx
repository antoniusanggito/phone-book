import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import {
  MockEditContactComponent,
  editContactMock,
  errorEditContactMock,
  successEditContactMock,
} from '../../__mocks__/editContactMock';

describe('useEditContactMutation() hook call', () => {
  afterEach(() => {
    cleanup();
  });

  it('should edit and display feedback', async () => {
    render(
      <MockedProvider mocks={successEditContactMock} addTypename={false}>
        <MockEditContactComponent />
      </MockedProvider>
    );

    expect(
      screen.queryByText(
        `Edited to ${editContactMock.update_contact_by_pk?.first_name} ${editContactMock.update_contact_by_pk?.last_name}}`
      )
    ).not.toBeInTheDocument();

    const button = await screen.findByRole('button');
    userEvent.click(button);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(
      await screen.findByText(
        `Edited to ${editContactMock.update_contact_by_pk?.first_name} ${editContactMock.update_contact_by_pk?.last_name}`
      )
    ).toBeInTheDocument();
  });

  it('should display only error when failed', async () => {
    render(
      <MockedProvider mocks={errorEditContactMock} addTypename={false}>
        <MockEditContactComponent />
      </MockedProvider>
    );

    const button = await screen.findByRole('button');
    userEvent.click(button);

    expect(await screen.findByText('An error occured')).toBeInTheDocument();
    expect(
      screen.queryByText(
        `Edited to ${editContactMock.update_contact_by_pk?.first_name} ${editContactMock.update_contact_by_pk?.last_name}`
      )
    ).not.toBeInTheDocument();
  });
});
