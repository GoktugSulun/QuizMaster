import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Suspense, lazy, useEffect } from 'react';
import { RouteEnums } from '@/Constants/Enums';

const Dashboard = lazy(() => import('@/Pages/Dashboard/Dashboard'));
const Quiz = lazy(() => import('@/Pages/Quiz/Quiz'));
const QuizRules = lazy(() => import('@/Pages/QuizRules/QuizRules'));
const QuizResult = lazy(() => import('@/Pages/QuizResult/QuizResult'));
const Creator = lazy(() => import('@/Pages/Creator/Creator'));
const Profile = lazy(() => import('@/Pages/Profile/Profile'));
const PageNotFound = lazy(() => import('@/Pages/PageNotFound/PageNotFound'));

import { Auth as AuthModal } from '@/Pages/Auth';
import useAuth from '@/Hooks/useAuth';
import AppConfigThunks from '../Store/AppConfig.thunk';
import { FullSizeLoadingWrapper } from '../Layout';
import { Loading } from '../Components';

// TODO : Change route structure and use useBlocker to prevent navigation in some cases
const RouteList = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const authLocation = location.state?.authLocation;
  
  const { authorizedUser } = useAuth();

  useEffect(() => {
    if (token && !authorizedUser.id) {
      AppConfigThunks.getUser();
    }
  }, [authorizedUser.id]);

  // Reset scroll and start page from the top when page is reload or path is changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!authorizedUser.id && token) {
    return (
      <FullSizeLoadingWrapper>
        <Loading size={80} />
      </FullSizeLoadingWrapper>
    );
  }

  return (
    <Suspense fallback={<div />}>
      <Routes location={authLocation || location}>

        {/* Public Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={RouteEnums.DEFAULT} element={<Navigate to={RouteEnums.FEED} replace />} />
          <Route path={RouteEnums.FEED} element={<Dashboard />} />
          <Route path={RouteEnums.AUTH} element={<AuthModal />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isPrivate />}>
          <Route path={RouteEnums.FAVORITES} element={<Dashboard />} />
          <Route path={RouteEnums.SAVED} element={<Dashboard />} />
          <Route path={RouteEnums.COMPLETED} element={<Dashboard />} />
          <Route path={RouteEnums.CREATED} element={<Dashboard />} />
          <Route path={RouteEnums.QUIZ} element={<Quiz />} />
          <Route path={RouteEnums.QUIZ_RULES} element={<QuizRules />} />
          <Route path={RouteEnums.QUIZ_RESULTS} element={<QuizResult />} />
          <Route path={RouteEnums.PROFILE} element={<Profile />} />
          <Route path={RouteEnums.CREATOR} element={<Creator />} />
        </Route>

        {/* 404 Page */}
        <Route element={<ProtectedRoute is404 />}>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      { 
        authLocation 
          && (
            <Routes>
              <Route path={RouteEnums.AUTH} element={<AuthModal />} />
            </Routes> 
          )
      }
    </Suspense>
  );
};

export default RouteList;
