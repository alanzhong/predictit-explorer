import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server'; // tslint:disable-line

const prod = process.env.NODE_ENV === 'production';

/**
 * template for the index.html file.
 * Might as well get the types + static analysis of Typescript + React!
 */
export const getHtmlString = (js?: string) =>
  renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {!prod && <base href="http://localhost:10001/" />}
        <link rel="icon" href="/favicon.ico?v=1" />
        <title>PredictIt Explorer</title>
      </head>
      <body>
        <div id="root" />
        {prod ? (
          <script
            type="application/javascript"
            dangerouslySetInnerHTML={{ __html: js || '' }}
          />
        ) : (
          <script src="bundle.js" />
        )}
      </body>
    </html>
  );
