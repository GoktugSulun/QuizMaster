import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Suspense, lazy, useEffect } from 'react';
import { Fallback } from '../Components';

const Dashboard = lazy(() => import('@/Pages/Dashboard/Dashboard'));
const Login = lazy(() => import('@/Pages/Login/Login'));
const Register = lazy(() => import('@/Pages/Register/Register'));
const Test = lazy(() => import('@/Pages/Test/Test'));
const Quiz = lazy(() => import('@/Pages/Quiz/Quiz'));
const QuizRules = lazy(() => import('@/Pages/QuizRules/QuizRules'));
const QuizResult = lazy(() => import('@/Pages/QuizResult/QuizResult'));
const Creator = lazy(() => import('@/Pages/Creator/Creator'));

const RouteList = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  useEffect(() => {
    /*
      * Reset scroll and start page from the top when page is reload or path is changed
    */
  //  console.log('path => ', location.pathname);
   
   console.log(location, ' loccc');
   
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
      {/* TODO: Change route structure and use useBlocker to prevent navigation in some cases */}
      <Routes>
        {/* TODO: HomePage will be global route, and others will be protected */}
        {/* Protected Route */}
        <Route element={<ProtectedRoute isAllowed />}>
          <Route path="/" element={<Dashboard />}>
            <Route path='favorites' />
            <Route path='saved' />
            <Route path='completed' />
            <Route path='created' />
          </Route>
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/rules/quiz' element={<QuizRules />} />
          <Route path='/results/quiz' element={<QuizResult />} />
          <Route path="/test" element={<Test />} />
          <Route path="/creator/:quizId?" element={<Creator />} />
          <Route path="/creator/edit/:quizId" element={<Creator />} />
        </Route>

        {/* Private Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 404 Page */}
        <Route element={<ProtectedRoute is404 isAllowed />}>
          <Route path="*" element={<div> Page Not Found! </div>} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouteList;
