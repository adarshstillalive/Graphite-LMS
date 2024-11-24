import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './app.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import appRoutes from './routes/appRoutes';

const persistor = persistStore(store);

const appRoute = createBrowserRouter(appRoutes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

function App() {
  return (
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <RouterProvider
            future={{ v7_startTransition: true }}
            router={appRoute}
          />
          ;
        </Provider>
      </GoogleOAuthProvider>
    </PersistGate>
  );
}

export default App;
