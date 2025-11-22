import { useLocation, Link } from 'react-router';

const Success = () => {
  const { state } = useLocation();
  const { message } = state;

  return (
    <div>
      <h1 style={{ color: '#008000' }}>Success</h1>
      <p style={{ marginBottom: '10px' }}>{message}</p>
      <Link to='/'>Home</Link>
    </div>
  );
};

export default Success;
