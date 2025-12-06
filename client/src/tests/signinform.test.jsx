import { screen, fireEvent, waitFor } from '@testing-library/react';
import {
  createMockLocalStorage,
  renderWithAuth,
  renderWithMockAuth,
} from './test-helpers';
import SignInForm from '../components/SignInForm';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Sign Up', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();

    Object.defineProperty(window, 'localStorage', {
      value: createMockLocalStorage(),
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fill out each field', () => {
    const signInUser = jest.fn();

    renderWithMockAuth(<SignInForm />, {
      authProps: { value: signInUser },
    });

    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);

    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'ellenripley@weyland.yutani' },
    });
    fireEvent.change(passwordInput, {
      target: { name: 'password', value: 'pa$$word' },
    });

    expect(emailInput).toHaveValue('ellenripley@weyland.yutani');
    expect(passwordInput).toHaveValue('pa$$word');
  });

  test('submit the form and check the request body', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    renderWithAuth(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);

    const submitButton = screen
      .getAllByRole('button')
      .find((button) => button.type === 'submit');

    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'ellenripley@weyland.yutani' },
    });
    fireEvent.change(passwordInput, {
      target: { name: 'password', value: 'pa$$word' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const [url, options] = global.fetch.mock.calls[0];

    expect(url).toBe('/api/auth/signin');
    expect(options).toEqual(
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': expect.stringMatching(/application\/json/i),
        }),
      }),
    );

    expect(JSON.parse(options.body)).toEqual({
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
      status: 200,
    });

    renderWithAuth(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/);
    const passwordInput = screen.getByLabelText(/password/);

    const submitButton = screen
      .getAllByRole('button')
      .find((button) => button.type === 'submit');

    fireEvent.change(emailInput, {
      target: { name: 'email', value: 'ellenripley@weyland.yutani' },
    });
    fireEvent.change(passwordInput, {
      target: { name: 'password', value: 'pa$$word' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/auth/signin',
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
