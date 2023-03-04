import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mealsReducer from '../slices/meals';

const reducer = combineReducers({
  meals: mealsReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
