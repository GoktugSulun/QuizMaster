import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Fallback } from '../Components';
import { Header } from '@/Components/Header';
import { Sidebar } from '@/Components/Sidebar';
import { ContentWrapper, MainWrapper } from '../Layout';

type ProtectedRouteProps = {
  isAllowed?: boolean,
  redirectPath?: string,
  is404?: boolean
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { isAllowed = false, redirectPath = '/', is404 = false } = props;
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
    <MainWrapper>
      <Sidebar /> 
      <ContentWrapper>
        <Header is404={is404} />
        <Suspense fallback={<Fallback size={80} />}>
          <Outlet />
        </Suspense>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default ProtectedRoute;