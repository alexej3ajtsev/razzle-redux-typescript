import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express, { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { renderRoutes, matchRoutes } from 'react-router-config';
import routes from './routes';

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
    const promises = matchedRoute && matchedRoute
      .filter(r => r.route.loadData)
      .map(r => r.route.loadData)

    const data = await Promise.all(promises)
    const markup = renderToString(
      <StaticRouter context={context} location={req.path}>
        {renderRoutes(routes)}
      </StaticRouter>
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
    </body>
</html>`
      );
    }
  });

export default server;
