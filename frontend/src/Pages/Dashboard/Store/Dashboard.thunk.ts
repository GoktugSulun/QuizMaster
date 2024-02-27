import { ApiURL } from '@/Constants/ApiURL';
import { request } from '../../../Core/Request';
import { type CreatedQuizType, DashboardActions } from './Dashboard.slice';

const DashboardThunks = {
  getAllQuizzes: () => request({
    method: 'GET',
    url: `${ApiURL.QUIZ}/all`,
    key: 'getAllQuizzes',
    success: ({ data, thunkAPI }) => {
      const payload = data as CreatedQuizType[];
      thunkAPI.dispatch(DashboardActions.setQuizzes(payload));
    }
  })
};

export default DashboardThunks;
