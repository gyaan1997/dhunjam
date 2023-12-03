import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './Pages/Login/AdminLogin';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import './App.css';

function App() {
  return (
<div className='App'>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
      </div>

  );
}

export default App;
