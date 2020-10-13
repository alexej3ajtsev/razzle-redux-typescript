import { combineReducers } from '@reduxjs/toolkit';
import testSlice from './slices/test';

export default combineReducers({
  test: testSlice.reducer
})