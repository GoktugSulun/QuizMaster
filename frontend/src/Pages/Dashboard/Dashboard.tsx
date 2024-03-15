import { useEffect, useState } from 'react'; 
import QuizPreviewList from './Components/QuizPreviewList';
import * as S from './Style/Dashboard.style';
import DashboardThunks from './Store/Dashboard.thunk';
import { useAppSelector, useThunk } from '@/Core/Hooks';
import { Loading } from '@/Core/Components';
import { useLocation } from 'react-router-dom';
import { QuizTypeEnums } from '@/Constants/Enums';

const Dashboard = () => {
  const location = useLocation();
  const { isLoading, isSuccess, isError, setIdle } = useThunk("getQuizzes");
  const { page, limit } = useAppSelector((state) => state.Dashboard);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(true);

  const getQuizzesHandler = ({ newPage }: { newPage?: number } = {}) => {
    // todo : cancel service when location is changed
    const path = location.pathname.split('/')[1];
    const type = (path === 'feed' ? QuizTypeEnums.ALL : path) as QuizTypeEnums;
    DashboardThunks.getQuizzes({ type, page: newPage || page, limit });
  };

  useEffect(() => {
    getQuizzesHandler({ newPage: 1 });
    return () => {
      setIsLoadingGlobal(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isSuccess || isError) {
      setIdle();
      setIsLoadingGlobal(false);
    }
  }, [isSuccess, isError]);

  return (
    <S.Dashboard>
      { 
        isLoadingGlobal
          ? <Loading fullWidth size={70} /> 
          : <>
              <QuizPreviewList getQuizzesHandler={getQuizzesHandler} />
              { isLoading && <Loading fullWidth={page === 1} margin={page === 1 ? "0" : "50px 0"} size={70} /> }
          </>
      }
    </S.Dashboard>
  )
}

export default Dashboard