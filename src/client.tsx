import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './redux/rootReducer';

// @ts-ignore
const store = createStore(window.__PRELOADED_STATE__ || {});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, null, Action>;

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
