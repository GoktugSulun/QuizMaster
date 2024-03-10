import { useEffect } from 'react'; 
import QuizPreviewList from './Components/QuizPreviewList';
import * as S from './Style/Dashboard.style';
import DashboardThunks from './Store/Dashboard.thunk';
import { useAppDispatch, useAppSelector, useThunk } from '@/Core/Hooks';
import { Loading } from '@/Core/Components';
import { useLocation } from 'react-router-dom';
import { QuizTypeEnums } from '@/Constants/Enums';
import { DashboardActions } from './Store/Dashboard.slice';
import { type ActivePathnameTypes } from './Types/DashboardTypes';

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isLoading } = useThunk("getQuizzes");
  const { page, limit, quizzes, activePathname } = useAppSelector((state) => state.Dashboard);

  const getQuizzesHandler = () => {
    // todo : cancel service when location is changed
    const path = location.pathname.split('/')[1];
    const type = (path === 'feed' ? QuizTypeEnums.ALL : path) as QuizTypeEnums;
    DashboardThunks.getQuizzes({ type, page, limit });
  };

  useEffect(() => {
    const newPathname = location.pathname as ActivePathnameTypes;
    dispatch(DashboardActions.setActivePathname(newPathname));
    if (page > 1) {
      dispatch(DashboardActions.setPage({ newPage: 1 }));
      return;
    }
    console.log('location-1 ', location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    getQuizzesHandler();
  }, [page, activePathname]);

  return (
    <S.Dashboard>
      { 
        page === 1 && !quizzes.length
          ? <Loading fullWidth size={70} /> 
          : <>
              <QuizPreviewList />
              { isLoading && <Loading fullWidth={page === 1} margin={page === 1 ? "0" : "50px 0"} size={70} /> }
          </>
      }
    </S.Dashboard>
  )
}

export default Dashboard