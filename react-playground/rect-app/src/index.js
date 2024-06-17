import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  App, 
  ToDo, 
  Counter
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
      <Route path="/todo"     element={<ToDo />} />
      <Route path="/counter"  element={<Counter />} />
    </Routes>
  </BrowserRouter>
);

