import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {authReducer} from './reducer/authReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cart', 'user'],
};

const rootReducer = {
  auth: authReducer,
};
const persistCombinedReducers = persistCombineReducers(
  persistConfig,
  rootReducer,
);

export const store = createStore(
  persistCombinedReducers,
  applyMiddleware(thunk),
);
export const persistor = persistStore(store);
