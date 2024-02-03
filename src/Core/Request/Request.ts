import axios, { AxiosResponse } from 'axios';
import { handleError } from './HandleError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '../../main';
import { GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

type AsyncThunkConfig = {
  state?: ReturnType<typeof store.getState>
  dispatch?: typeof store.dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

type SuccessFunctionType = {
  data: any,
  thunkAPI: GetThunkAPI<AsyncThunkConfig>
}

type RequestProps = {
  method?: 'GET' | 'POST' | 'DELETE' |'PUT' | 'PATCH',
  url: string,
  payload?: any,
  files?: File[],
  key: string,
  success?: ({ data, thunkAPI }: SuccessFunctionType) => void,
  failure?: (error: Error | AxiosResponse) => void 
}

const baseURL = import.meta.env.VITE_API_URL;

const payloadWithFiles = (payload: any, files: File | File[]) => {
  const formData = new FormData();
  if (Array.isArray(files)) {
    for (let i=0; i<files.length; i++) {
      formData.append('files', files[i]);
    }
  } else {
    formData.append('files', files);
  }
  formData.append('data', JSON.stringify(payload));
  return formData;
};

export const request = async ({ method='GET', url, payload, files, key, success, failure }: RequestProps) => {
  const thunk = createAsyncThunk(`request/${key}`, async (_, thunkAPI) => {
    try {
      // Todo: delete
      await new Promise(resolve => setTimeout(resolve, 3000));
      const data = files ? payloadWithFiles(payload, files) : payload;
      const response = await axios({ method, baseURL, url, data });
      if (response.status === 200 && response.statusText === 'OK') {
        return success?.({ data: response.data, thunkAPI });
      }
      failure?.(response);
      return thunkAPI.rejectWithValue('Oppss problem');
    } catch (error) {
      if (error instanceof Error) {
        handleError(error);
        failure?.(error);
        return thunkAPI.rejectWithValue(error.message);
      }
      console.error(error, ' error');
    }
  });
  return store.dispatch(thunk());
};
