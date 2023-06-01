import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state"
// By importing configureStore, you can use it to configure and create a 
//Redux store in your application. The function provides various options 
//and customization possibilities for setting up the store, such as 
//middleware configuration and dev tools integration.
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '@reduxjs/toolkit';
// persist is so we can save all the user information locally on client side

const persistConfig = { key: "root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck:{
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

/* <Provider store={store}>: This component is imported from the 
react-redux library and is responsible for providing the Redux store to 
the entire application. It wraps the components inside it, allowing them 
to access the Redux store and dispatch actions. 

<PersistGate loading={null} persistor={persistStore(store)}>: This 
component is imported from the redux-persist/integration/react library 
and provides a way to delay rendering the application until the 
persisted state is retrieved from storage. It works in conjunction with 
Redux Persist to ensure that the application loads with the persisted 
state if available.
*/

