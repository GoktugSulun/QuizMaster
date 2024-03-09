import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Fallback, Loading } from '../Components';
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
  };

  if (!isAllowed) {
    return (
      <Suspense fallback={<Fallback size={80} />}>
        <Navigate to={redirectPath} replace />
      </Suspense>
    );
  };

  const { pathname } = useLocation();
  const isCreatorPage = pathname.includes("/creator")

  return (
    <MainWrapper>
      <Sidebar /> 
      <ContentWrapper>
        { !isCreatorPage && <Header is404={is404} /> } 
        <Suspense fallback={<Loading fullWidth size={80} />}>
          <Outlet />
        </Suspense>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default ProtectedRoute;