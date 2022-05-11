import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/main.css'
import AppRouter from './route';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// serviceWorker.register();
serviceWorker.unregister();

