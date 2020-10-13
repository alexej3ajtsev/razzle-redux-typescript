import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, AppState, AppThunk } from "../../client";

const testSlice = createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
    setValue: (state, action: PayloadAction<number>) => state = action.payload
  }
})

export const asyncThunkActionMultipl = (num: number): AppThunk =>
  async (dispatch: AppDispatch, getState: () => AppState) => {
    return new Promise((resolve) => {
      dispatch(testSlice.actions.increment(2));
      const { test } = getState();
      setTimeout(() => {
        dispatch(testSlice.actions.setValue(test * num));
        resolve()
      }, 1000)
    })
  }
export default testSlice