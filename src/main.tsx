import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './Core/RootReducers.js';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import customMiddleWare from './Core/Middleware/CustomMiddleware.js';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleWare)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <Provider store={store} >
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
);
