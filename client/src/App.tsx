import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './app.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import appRoutes from './routes/appRoutes';
import { Toaster } from './components/ui/toaster';
import { UploadProvider } from './context/uploadContext';
import { SheetComponent } from './components/common/SheetComponent';
import { NotificationProvider } from './context/notificationContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { WebSocketProvider } from './context/webSocketContext';

const persistor = persistStore(store);

const appRoute = createBrowserRouter(appRoutes);

function App() {
  return (
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <WebSocketProvider>
            <PayPalScriptProvider
              options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
            >
              <NotificationProvider>
                <UploadProvider>
                  <SheetComponent />

                  <RouterProvider router={appRoute} />
                </UploadProvider>
              </NotificationProvider>
            </PayPalScriptProvider>
          </WebSocketProvider>
          <Toaster />
        </Provider>
      </GoogleOAuthProvider>
    </PersistGate>
  );
}

export default App;
