import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <>{children}</>
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace={true} />
  );
};

export default ProtectedRoute;
