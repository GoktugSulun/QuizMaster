import { ApiURL } from '@/Constants/ApiURL';
import { request } from '../../../Core/Request';
import { DashboardActions } from './Dashboard.slice';
import { IQuizResponse } from '@/Constants/ResponseTypes';
import { snackbar } from '@/Core/Utils';

const DashboardThunks = {
  getAllQuizzes: () => request({
    method: 'GET',
    url: `${ApiURL.QUIZ}/all`,
    key: 'getAllQuizzes',
    success: ({ data, thunkAPI }) => {
      const payload = data as IQuizResponse[];
      thunkAPI.dispatch(DashboardActions.setQuizzes(payload));
    }
  }),
  markQuizAsFavorite: (payload: { quizId: string; }) => request({
    method: 'POST',
    url: `${ApiURL.MARK_QUIZ_AS_FAVORITE}`,
    key: 'markQuizAsFavorite',
    payload,
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.updateFavoriteField({ quizId: payload.quizId, value: true }));
      snackbar("Quiz has been added to favorites");
    }
  }),
  unmarkQuizAsFavorite: (quizId: string) => request({
    method: 'PUT',
    url: `${ApiURL.UNMARK_QUIZ_AS_FAVORITE}/${quizId}`,
    key: 'unmarkQuizAsFavorite',
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.updateFavoriteField({ quizId: quizId, value: false }));
      snackbar("Quiz has been removed from favorites");
    }
  }),
  markQuizAsSaved: (payload: { quizId: string; }) => request({
    method: 'POST',
    url: `${ApiURL.MARK_QUIZ_AS_SAVED}`,
    key: 'markQuizAsSaved',
    payload,
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.updateSaveField({ quizId: payload.quizId, value: true }));
      snackbar("Quiz has been saved");
    }
  }),
  unmarkQuizAsSaved: (quizId: string) => request({
    method: 'PUT',
    url: `${ApiURL.UNMARK_QUIZ_AS_SAVED}/${quizId}`,
    key: 'unmarkQuizAsSaved',
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.updateSaveField({ quizId, value: false }));
      snackbar("Quiz has been removed from saves");
    }
  }),
};

export default DashboardThunks;
