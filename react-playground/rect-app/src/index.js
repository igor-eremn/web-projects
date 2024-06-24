import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  App,  
  Counter,
  ToDo,
  Weather
} from './App';
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/"         element={<App />} />
      <Route path="/counter"  element={<Counter />} />
      <Route path="/todo"     element={<ToDo />} />
      <Route path="/weather"  element={<Weather />} />
    </Routes>
  </BrowserRouter>
);

