import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SignUpForm = ({ className }) => {
  const { signUpUser } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: fullName,
      email,
      password,
    };

    await signUpUser(user);

    setFullName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type='text'
        id='fullName'
        name='fullName'
        placeholder='Full Name'
        required
        value={fullName}
        onChange={({ target: { value } }) => setFullName(value)}
      />

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
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
