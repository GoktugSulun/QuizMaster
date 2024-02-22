import { store } from '@/main';
import { AppConfigActions } from '../Store/AppConfig.slice';
import { OptionsObject } from 'notistack';

const snackbar = (message: string, options?: OptionsObject) => store.dispatch(AppConfigActions.enqueueSnackbar({ message, options }));

export default snackbar;