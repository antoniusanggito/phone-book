import { act, fireEvent, render, screen } from '@testing-library/react';
import AddForm from '../../components/AddForm';
import waitForData from '../../utils/waitForData';

global.scrollTo = jest.fn();

jest.mock('@apollo/client', () => {
  // const data = { };
  return {
    __esModule: true,
    ...jest.requireActual('@apollo/client'),
    // useQuery: jest.fn(() => ({ data })),
    useMutation: jest.fn(() => [jest.fn(), null]),
  };
});

describe('AddForm element render', () => {
  it('should update input values correctly', async () => {
    render(<AddForm />);

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const phonesInput = screen.getByPlaceholderText('Phone Number');
    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(phonesInput).toHaveValue('');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phonesInput, { target: { value: '081' } });

    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(phonesInput).toHaveValue('081');
  });

  it('should reset form after submit', async () => {
    render(<AddForm />);

    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const phonesInput = screen.getByPlaceholderText('Phone Number');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phonesInput, { target: { value: '081' } });
    fireEvent.click(submitBtn);

    await act(async () => {
      await waitForData();
    });

    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(phonesInput).toHaveValue('');
  });
});