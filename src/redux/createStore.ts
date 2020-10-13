import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export default (preloadedState: { [key: string]: any }) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    preloadedState
  })

  // @ts-ignore
  if (process.env.NODE_ENV === 'development' && module.hot) {
    // @ts-ignore
    module.hot.accept('./rootReducer', () => {
      const newRootReducer = require('./rootReducer').default
      store.replaceReducer(newRootReducer)
    })
  }

  return store
}