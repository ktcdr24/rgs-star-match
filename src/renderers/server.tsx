import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { App } from 'components/App';

export async function serverRenderer(): Promise<nestedObject> {
  const initialData = {
    appName: 'Reactful',
  };

  const pageData = {
    title: `Hello ${initialData.appName}`,
  };

  console.log('in server');

  return Promise.resolve({
    initialData,
    initialMarkup: ReactDOMServer.renderToString(
      <App initialData={initialData} />,
    ),
    pageData,
  });
}
