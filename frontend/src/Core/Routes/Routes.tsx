import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Suspense, lazy, useEffect } from 'react';
import { RouteEnums } from '@/Constants/Enums';

const Dashboard = lazy(() => import('@/Pages/Dashboard/Dashboard'));
const Test = lazy(() => import('@/Pages/Test/Test'));
const Quiz = lazy(() => import('@/Pages/Quiz/Quiz'));
const QuizRules = lazy(() => import('@/Pages/QuizRules/QuizRules'));
const QuizResult = lazy(() => import('@/Pages/QuizResult/QuizResult'));
const Creator = lazy(() => import('@/Pages/Creator/Creator'));

const AuthModal = lazy(() => import('@/Pages/Auth/Auth'));

// TODO : Change route structure and use useBlocker to prevent navigation in some cases
// TODO : HomePage will be global route, and others will be protected
const RouteList = () => {
  // const token = localStorage.getItem('token');
  const location = useLocation();
  const authLocation = location.state?.authLocation;

  // Reset scroll and start page from the top when page is reload or path is changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<div />}>
      <Routes location={authLocation || location}>
        {/* Protected Route */}
        <Route element={<ProtectedRoute isAllowed />}>
          <Route path={RouteEnums.DEFAULT} element={<Navigate to={RouteEnums.FEED} replace />} />
          <Route path={RouteEnums.FEED} element={<Dashboard />} />
          <Route path={RouteEnums.FAVORITES} element={<Dashboard />} />
          <Route path={RouteEnums.SAVED} element={<Dashboard />} />
          <Route path={RouteEnums.COMPLETED} element={<Dashboard />} />
          <Route path={RouteEnums.CREATED} element={<Dashboard />} />

          <Route path={RouteEnums.QUIZ} element={<Quiz />} />
          <Route path={RouteEnums.QUIZ_RULES} element={<QuizRules />} />
          <Route path={RouteEnums.QUIZ_RESULTS} element={<QuizResult />} />
          <Route path={RouteEnums.TEST} element={<Test />} />
          <Route path={RouteEnums.CREATOR} element={<Creator />} />

          <Route path={RouteEnums.AUTH} element={<AuthModal />} />
        </Route>

        {/* 404 Page */}
        <Route element={<ProtectedRoute is404 isAllowed />}>
          <Route path="*" element={<div> Page Not Found! </div>} />
        </Route>
      </Routes>
      { authLocation && <Route path={RouteEnums.AUTH} element={<AuthModal />} /> }
    </Suspense>
  );
};

export default RouteList;
