import { useEffect } from 'react';
import QuizPreviewList from './Components/QuizPreviewList';
import * as S from './Style/Dashboard.style';
import DashboardThunks from './Store/Dashboard.thunk';
import { useThunk } from '@/Core/Hooks';
import { Loading } from '@/Core/Components';

const Dashboard = () => {

  const { isLoading } = useThunk("getAllQuizzes");

  useEffect(() => {
    DashboardThunks.getAllQuizzes();
  }, []);

  return (
    <S.Dashboard>
      { isLoading ? <Loading size={70} /> : <QuizPreviewList />} 
    </S.Dashboard>
  )
}

export default Dashboard