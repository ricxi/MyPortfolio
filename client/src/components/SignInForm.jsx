import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SignInForm = ({ className }) => {
  const { signInUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    await signInUser(user);

    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Email'
        required
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
      />

      <input
        type='password'
        id='password'
        name='password'
        placeholder='Password'
        required
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />

      <button type='submit' className='form-button'>
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
