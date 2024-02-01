import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Fallback } from '../Components';

type ProtectedRouteProps = {
  isAllowed?: boolean,
  redirectPath?: string,
}

const ProtectedRoute = ({ isAllowed = false, redirectPath = '/' }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <Suspense fallback={<Fallback size={80} />}>
        <Navigate to="/login" replace />
      </Suspense>
    );
  }

  if (!isAllowed) {
    return (
      <Suspense fallback={<Fallback size={80} />}>
        <Navigate to={redirectPath} replace />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Fallback size={80} />}>
      <Outlet />
    </Suspense>
  );
};

export default ProtectedRoute;