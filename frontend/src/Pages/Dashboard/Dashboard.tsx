import { useEffect, useState } from 'react'; 
import QuizPreviewList from './Components/QuizPreviewList';
import * as S from './Style/Dashboard.style';
import DashboardThunks from './Store/Dashboard.thunk';
import { useAppSelector, useThunk } from '@/Core/Hooks';
import { Loading } from '@/Core/Components';
import { useLocation } from 'react-router-dom';
import { QuizTypeEnums } from '@/Constants/Enums';
import ConfirmModal from './Components/ConfirmModal';

const Dashboard = () => {
  const location = useLocation();
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(true);
  const { page, limit } = useAppSelector((state) => state.Dashboard);
  const { isLoading, isSuccess, isError, setIdle } = useThunk("getQuizzes");

  const getQuizzesHandler = ({ newPage, signal }: { newPage?: number, signal?: AbortSignal } = {}) => {
    const path = location.pathname.split('/')[1];
    const type = (path === 'feed' ? QuizTypeEnums.ALL : path) as QuizTypeEnums;
    DashboardThunks.getQuizzes({ type, page: newPage || page, limit, signal });
  };

  useEffect(() => {
    const controller = new AbortController();
    getQuizzesHandler({ newPage: 1, signal: controller.signal });
    return () => {
      controller.abort();
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
      <ConfirmModal />
    </S.Dashboard>
  )
}

export default Dashboard