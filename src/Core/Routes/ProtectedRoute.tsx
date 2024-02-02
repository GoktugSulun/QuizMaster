import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Fallback } from '../Components';
import { Header } from '@/Components/Header';
import { Sidebar } from '@/Components/Sidebar';
import { MainWrapper } from '../Layout';

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
    <>
      <Header />
      <MainWrapper>
        <Sidebar /> 
        <Suspense fallback={<Fallback size={80} />}>
          <Outlet />
        </Suspense>
      </MainWrapper>
    </>
  );
};

export default ProtectedRoute;