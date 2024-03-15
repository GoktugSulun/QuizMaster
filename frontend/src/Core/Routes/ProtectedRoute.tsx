import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loading } from '../Components';
import { Header } from '@/Components/Header';
import { Sidebar } from '@/Components/Sidebar';
import { ContentWrapper, MainWrapper } from '../Layout';

type ProtectedRouteProps = {
  isPrivate?: boolean;
  is404?: boolean;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
   const { is404 = false, isPrivate = false } = props;
   const location = useLocation();
   const token = localStorage.getItem('token');

   if (isPrivate && !token) {
      return (
         <Navigate 
            to="/auth/login" 
            replace 
            state={{ 
               to: location.pathname, 
               from: location.state?.from, 
               search: location.state?.search
            }} 
         />
      );
   }

   const isCreatorPage = location.pathname.includes("/creator")

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