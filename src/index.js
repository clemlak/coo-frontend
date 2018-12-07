import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import './index.scss';

import CheckProvider from './components/checkProvider';

ReactDOM.render(
  <CheckProvider />,
  document.getElementById('root'),
);

serviceWorker.unregister();
