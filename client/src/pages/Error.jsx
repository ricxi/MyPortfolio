import { useLocation, Link } from 'react-router';

const Error = () => {
  const { state } = useLocation();
  const { hasError, message } = state;

  return (
    <div>
      <h1 style={{ color: 'red' }}>Error</h1>
      {hasError && <p>{message}</p>}
      <Link to='/'>Home</Link>
    </div>
  );
};

export default Error;
