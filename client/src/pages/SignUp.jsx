import { NavLink } from 'react-router';
import Card from '../components/Card';
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
  return (
    <Card>
      <div className='flex-col'>
        <h1>Sign Up</h1>
        <SignUpForm className='form-col' />
        <NavLink to='/signin'>Sign In</NavLink>
      </div>
    </Card>
  );
};

export default SignUp;
