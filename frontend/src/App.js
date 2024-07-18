import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
