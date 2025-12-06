import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithAuth, renderWithMockAuth } from './test-helpers';
import SignUpForm from '../components/SignUpForm';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Sign Up', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fill out each field', () => {
    const providerProps = {
      value: {
        registerUser: jest.fn(),
      },
    };

    renderWithMockAuth(<SignUpForm />, { providerProps });
    const fullNameInput = screen.getByLabelText(/fullName/);
    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);

    fireEvent.change(fullNameInput, {
      target: { name: 'fullName', value: 'Ellen Ripley' },
    });
    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'ellenripley@weyland.yutani' },
    });
    fireEvent.change(passwordInput, {
      target: { name: 'password', value: 'pa$$word' },
    });

    expect(fullNameInput).toHaveValue('Ellen Ripley');
    expect(emailInput).toHaveValue('ellenripley@weyland.yutani');
    expect(passwordInput).toHaveValue('pa$$word');
  });

  test('submit the form and check the request body', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({}),
    });

    renderWithAuth(<SignUpForm />);

    const fullNameInput = screen.getByLabelText(/fullName/);
    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);

    const submitButton = screen
      .getAllByRole('button')
      .find((button) => button.type === 'submit');

    fireEvent.change(fullNameInput, {
      target: { name: 'fullName', value: 'Ellen Ripley' },
    });
    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'ellenripley@weyland.yutani' },
    });
    fireEvent.change(passwordInput, {
      target: { name: 'password', value: 'pa$$word' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [url, options] = global.fetch.mock.calls[0];

    expect(url).toBe('/api/users');
    expect(options).toEqual(
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': expect.stringMatching(/application\/json/i),
        }),
      }),
    );

    expect(JSON.parse(options.body)).toEqual({
      name: 'Ellen Ripley',
      email: 'ellenripley@weyland.yutani',
      password: 'pa$$word',
    });
  });

  test('submit the form and check the response', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({
        token: 'jwt-token-from-server',
        user: {
          fullname: 'ellenripley',
          email: 'ellenripley@weyland.yutani',
          password: '',
        },
      }),
      ok: true,
      status: 201,
    });

    renderWithAuth(<SignUpForm />);

    const fullNameInput = screen.getByLabelText(/fullName/);
    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);

    const submitButton = screen
      .getAllByRole('button')
      .find((button) => button.type === 'submit');

    fireEvent.change(fullNameInput, {
      target: { name: 'fullName', value: 'Ellen Ripley' },
    });
    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'ellenripley@weyland.yutani' },
    });
    fireEvent.change(passwordInput, {
      target: { name: 'password', value: 'pa$$word' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/users',
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('/signin');
  });
});
