import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isSignedIn, isLoading } = useAuth();

  return isLoading ? (
    <Loading />
  ) : isSignedIn ? (
    <>{children}</>
  ) : (
    <Navigate to='/signin' state={{ from: location }} replace={true} />
  );
};

export default ProtectedRoute;
