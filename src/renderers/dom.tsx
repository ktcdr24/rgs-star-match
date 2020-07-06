import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from 'components/App';

import '../styles/index.css';

console.log('in dom');
ReactDOM.hydrate(
  <App initialData={window.__R_DATA.initialData} />,
  document.getElementById('root'),
);
