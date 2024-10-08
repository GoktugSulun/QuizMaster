import { AxiosError, CanceledError } from 'axios';
import { snackbar } from '../Utils';

export const handleError = (error: Error) => {

  if (error instanceof AxiosError) {
    const { message } = error;

    if (error.response?.status === 404) {
      return snackbar(message || 'Page Not Found', { variant: 'error' });
    }
 
    if (error?.response?.status === 401) {
      snackbar(message || 'Unauthorized!', { variant: "error" });
      localStorage.clear();
      window.location.replace('/auth/login');
      return; 
    }
  }

  if (error instanceof CanceledError) {
    return;
  }

  return snackbar(error.message || "Something went wrong with the server", { variant: 'error' });
};