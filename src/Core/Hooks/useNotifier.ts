import { useSnackbar, SnackbarKey } from 'notistack';
import { useEffect } from 'react';
import { AppConfigActions } from '../Store/AppConfig.slice';
import useAppSelector from './useAppSelector';
import useAppDispatch from './useAppDispatch';
import { NotificationTypes } from '../Store/AppConfig.model';

let displayed: SnackbarKey[] = [];

const useNotifier = () => {
  const dispatch = useAppDispatch();
  const { notifications }: { notifications: NotificationTypes[] } = useAppSelector((state) => state.AppConfig);
  const { enqueueSnackbar, closeSnackbar  } = useSnackbar();

  const addSnackbar = (key: SnackbarKey) => {
    displayed.push(key);
  };

  const removeSnackbar = (key: SnackbarKey) => {
    displayed = [...displayed.filter((id) => id !== key)];
  };

  useEffect(() => {
    notifications.forEach((notification) => {
      const { message, options } = notification;

      // do nothing if snackbar is already displayed
      if (displayed.includes(options.key)) {
        return;
      }

      // display snackbar using notistack
      enqueueSnackbar(message, {
        ...options,
        // remove this snackbar from redux store and displayed
        onExited: (_, key) => {
          dispatch(AppConfigActions.closeSnackbar(key));
          removeSnackbar(key);
        }
      });

      addSnackbar(options.key);
    });
  }, [notifications]);

};

export default useNotifier;