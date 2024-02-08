import { AppConfigActions } from '../Store/AppConfig.slice';
import { store } from '../../main';
import { OptionsObject } from 'notistack';

const snackbar = (message: string, options?: OptionsObject) => store.dispatch(AppConfigActions.enqueueSnackbar({ message, options }));

export default snackbar;