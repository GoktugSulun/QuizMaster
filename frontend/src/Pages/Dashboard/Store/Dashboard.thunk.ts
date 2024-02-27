import { request } from '../../../Core/Request';
import { DashboardActions } from './Dashboard.slice';

const DashboardThunks = {
  fetchUserById: () => request({
    method: 'GET',
    url: 'posts',
    key: 'fetchUserById',
    success: ({ data, thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.setPosts(data));
    },
    // failure: (error) => {
    //   console.log(error, ' error failure func');
    // }
  })
};

export default DashboardThunks;
