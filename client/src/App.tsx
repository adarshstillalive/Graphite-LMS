import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './app.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import appRoutes from './routes/appRoutes';
import { useInitialTokenRefresh } from './hooks/useInitialTokenRefresh';

const persistor = persistStore(store);

const appRoute = createBrowserRouter(appRoutes);

function App() {
  useInitialTokenRefresh();
  return (
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <RouterProvider router={appRoute} />
        </Provider>
      </GoogleOAuthProvider>
    </PersistGate>
  );
}

export default App;
