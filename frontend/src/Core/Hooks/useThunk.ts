import { HttpResponseEnums } from '../Constants/Enums';
import { AppConfigActions } from '../Store/AppConfig.slice';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useThunk = (actionName: string) => {
  const dispatch = useAppDispatch();
  if (!actionName) {
    throw new Error('Missing params in useThunk: actionName is undefined!');
  }

  const { loadings, requestStatuses, errors, payloads } = useAppSelector((state) => state.AppConfig);
  const isLoading = loadings?.[actionName] || false;
  const requestStatus = requestStatuses?.[actionName] || HttpResponseEnums.IDLE;
  const error = errors?.[actionName] || null;
  const payload = payloads?.[actionName] || [];
  const isError = error !== null;
  const isSuccess = requestStatuses?.[actionName] === HttpResponseEnums.SUCCESS;
  const isIdle = requestStatuses?.[actionName] === HttpResponseEnums.IDLE;

  const setIdle = () => { dispatch(AppConfigActions.setIdle({ actionName })); };

  return { 
    isLoading, 
    requestStatus, 
    error, 
    payload,
    isError, 
    isSuccess, 
    isIdle, 
    setIdle 
  };
};

export default useThunk;