import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import Card from '../components/Card';
import SignInForm from '../components/SignInForm';

const SignIn = () => {
  const [errMessage, setErrMessage] = useState('');

  const { state } = useLocation();
  if (state && state.hasError) {
    setErrMessage(state.message);
  }

  return (
    <Card>
      {errMessage && (
        <div className='err-msg'>
          <h3 style={{ color: 'red' }}>Error</h3>
          You were not able to sign in because
        </div>
      )}
      <div className='flex-col'>
        <h1>Sign In</h1>
        <SignInForm className='form-col' />
        <NavLink to='/signup'>Sign Up</NavLink>
      </div>
    </Card>
  );
};

export default SignIn;
