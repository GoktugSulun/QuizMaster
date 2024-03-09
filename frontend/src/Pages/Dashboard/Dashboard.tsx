import { useEffect } from 'react'; 
import QuizPreviewList from './Components/QuizPreviewList';
import * as S from './Style/Dashboard.style';
import DashboardThunks from './Store/Dashboard.thunk';
import { useThunk } from '@/Core/Hooks';
import { Loading } from '@/Core/Components';
import { useLocation } from 'react-router-dom';
import { QuizTypeEnums } from '@/Constants/Enums';

const Dashboard = () => {
  const location = useLocation();
  const { isLoading } = useThunk("getQuizzes");

  useEffect(() => {
    // todo : cancel service when location is changed
    const path = location.pathname.split('/')[1];
    const type = (path === 'feed' ? QuizTypeEnums.ALL : path) as QuizTypeEnums;
    DashboardThunks.getQuizzes(type);
  }, [location]);

  return (
    <S.Dashboard>
      { isLoading ? <Loading size={70} /> : <QuizPreviewList />} 
    </S.Dashboard>
  )
}

export default Dashboard