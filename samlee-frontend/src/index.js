import React from 'react';
import ReactDOM from 'react-dom';
import Employee from './Employee';
import CustomerTable from './CustomerTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login2';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

ReactDOM.render(
  <Login />,
  document.getElementById('root')
);
