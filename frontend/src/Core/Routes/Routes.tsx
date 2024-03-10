import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Suspense, lazy, useEffect } from 'react';
import { Fallback } from '../Components';
import { RouteEnums } from '@/Constants/Enums';

const Dashboard = lazy(() => import('@/Pages/Dashboard/Dashboard'));
const Login = lazy(() => import('@/Pages/Login/Login'));
const Register = lazy(() => import('@/Pages/Register/Register'));
const Test = lazy(() => import('@/Pages/Test/Test'));
const Quiz = lazy(() => import('@/Pages/Quiz/Quiz'));
const QuizRules = lazy(() => import('@/Pages/QuizRules/QuizRules'));
const QuizResult = lazy(() => import('@/Pages/QuizResult/QuizResult'));
const Creator = lazy(() => import('@/Pages/Creator/Creator'));

// TODO : Change route structure and use useBlocker to prevent navigation in some cases
// TODO : HomePage will be global route, and others will be protected
const RouteList = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  useEffect(() => {
    /*
      * Reset scroll and start page from the top when page is reload or path is changed
    */
  //  console.log('path => ', location.pathname);
   
  //  console.log(location, ' loccc');
   
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // useEffect(() => {
  //   const scrollTo = () => window.scrollTo(0, 0);
  //   window.addEventListener('beforeunload', scrollTo);
  //   return () => {
  //     window.removeEventListener('beforeunload', scrollTo);
  //   };
  // }, []);
  
  // if (token) {
  //   return (
  //     <Fallback size={80} />
  //   );
  // }

  return (
    <Suspense fallback={<div />}>
      <Routes>
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
        </Route>

        {/* Private Routes */}
        <Route path={RouteEnums.LOGIN} element={<Login />} />
        <Route path={RouteEnums.REGISTER} element={<Register />} />

        {/* 404 Page */}
        <Route element={<ProtectedRoute is404 isAllowed />}>
          <Route path="*" element={<div> Page Not Found! </div>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouteList;
