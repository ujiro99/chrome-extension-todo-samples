import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';

import './workaround.js'

ReactDOM.render(
  <React.StrictMode>
    <Todo />
  </React.StrictMode>,
  document.getElementById('root')
);

