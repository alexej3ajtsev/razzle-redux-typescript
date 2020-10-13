import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express, { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import routes from './routes';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
import testSlice from './redux/slices/test';

// @ts-ignore
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  // @ts-ignore
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req: Request, res: Response) => {
    const context: {[key: string]: string} = {};
    const matchedRoute = matchRoutes(routes, req.path);
    const asyncActions  = matchedRoute && matchedRoute
      .filter(r => r.route.action)
      .map(r => ({
        action: r.route.action,
        params: r.route.params
      }))
    const store = createStore({});

    // TODO : избавиться от ts-ignore
    const promises = asyncActions.map(act => {
      const { action, params } = act;
      type ParamType = string | number;
      let args: ParamType[] = [];
      for (const key of Object.keys(params)) {
        if (req.query[key] && params[key] === 'int') {
          // @ts-ignore
          args.push(parseInt(req.query[key]))
        }
      }
      return store.dispatch(action(...args))
    })

    await Promise.all(promises); // Дожидаемся выполнения аснихронных экшенов

    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter context={context} location={req.path}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
        </script>
    </body>
</html>`
      );
    }
  });

export default server;
