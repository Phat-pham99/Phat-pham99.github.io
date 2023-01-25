import React from 'react';
import ReactDOM from 'react-dom/client';
import {Helmet} from "react-helmet";
import './index.css';
import App from './App.js';


const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
    
root.render(
            <App />
      )