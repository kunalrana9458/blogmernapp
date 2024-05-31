import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { combineReducers } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import themeReducer from './theme/themeSlice'

const rootReducer = combineReducers({
    user:userReducer,
    theme:themeReducer,
});

const persistConfig = {
    key:'root',
    storage,
    version:1,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action paths in the serializability middleware check
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // BUG: These actions often contain non-serializable values that are safe to ignore in this context
      },
    }),
});


export const persistor = persistStore(store)

