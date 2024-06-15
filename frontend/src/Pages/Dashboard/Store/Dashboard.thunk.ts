import { ApiURL } from '@/Constants/ApiURL';
import { request } from '../../../Core/Request';
import { DashboardActions } from './Dashboard.slice';
import { IQuizResponse } from '@/Constants/ResponseTypes';
import { snackbar } from '@/Core/Utils';
import { type unmarkQuizAsFavoriteTypes, type getQuizzesTypes, type markQuizAsFavoriteTypes, type markQuizAsSavedTypes, type unmarkQuizAsSavedTypes, type deleteQuizTypes } from '../Types/DashboardTypes';

const DashboardThunks = {
  getQuizzes: ({ type, page, limit, signal } : getQuizzesTypes) => request({
    method: 'GET',
    url: `${ApiURL.QUIZ}?type=${type}&page=${page}&limit=${limit}`,
    key: 'getQuizzes',
    signal,
    success: ({ data, thunkAPI }) => {
      const payload = data as IQuizResponse[];
      thunkAPI.dispatch(DashboardActions.setQuizzes({ data: payload, page }));
      thunkAPI.dispatch(DashboardActions.setPage({ newPage: page + 1 }));
    }
  }),
  markQuizAsFavorite: (payload: markQuizAsFavoriteTypes) => request({
    method: 'POST',
    url: `${ApiURL.MARK_QUIZ_AS_FAVORITE}`,
    key: 'markQuizAsFavorite',
    payload,
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.updateFavoriteField({ quizId: payload.quizId, value: true }));
      snackbar("Quiz has been added to favorites");
    }
  }),
  unmarkQuizAsFavorite: (payload: unmarkQuizAsFavoriteTypes) => request({
    method: 'PUT',
    url: `${ApiURL.UNMARK_QUIZ_AS_FAVORITE}/${payload.quizId}`,
    key: 'unmarkQuizAsFavorite',
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.updateFavoriteField({ quizId: payload.quizId, value: false, updateStore: payload.updateStore }));
      snackbar("Quiz has been removed from favorites");
    }
  }),
  markQuizAsSaved: (payload: markQuizAsSavedTypes) => request({
    method: 'POST',
    url: `${ApiURL.MARK_QUIZ_AS_SAVED}`,
    key: 'markQuizAsSaved',
    payload,
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.updateSaveField({ quizId: payload.quizId, value: true }));
      snackbar("Quiz has been saved");
    }
  }),
  unmarkQuizAsSaved: (payload: unmarkQuizAsSavedTypes) => request({
    method: 'PUT',
    url: `${ApiURL.UNMARK_QUIZ_AS_SAVED}/${payload.quizId}`,
    key: 'unmarkQuizAsSaved',
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.updateSaveField({ quizId: payload.quizId, value: false, updateStore: payload.updateStore }));
      snackbar("Quiz has been removed from saves");
    }
  }),
  deleteQuiz: (quizId: deleteQuizTypes) => request({
    method: 'DELETE',
    url: `${ApiURL.QUIZ}/${quizId}`,
    key: 'deleteQuiz',
    success: ({ thunkAPI }) => {
      thunkAPI.dispatch(DashboardActions.deleteQuiz(quizId));
      snackbar("Quiz has been deleted");
    }
  })
};

export default DashboardThunks;
