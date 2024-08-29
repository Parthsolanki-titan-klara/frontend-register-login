import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer, PERSIST, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER } from 'redux-persist';
import authReducer from '../slices/authSlice';


const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, authReducer);
  
  const store = configureStore({
    reducer: {
      auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware(
        {
          serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          }
        }
      ),
  });
  
  const persistor = persistStore(store);
  
  export { store, persistor };