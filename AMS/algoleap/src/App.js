// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import AssetPage from './components/AssetPage';
import InactivePage from './components/InactivePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/algoleap/:username" element={<UserPage />} />
        <Route path="/algoleap/:username/:employee_id" element={<AssetPage />} />
        <Route path="/algoleap/inactive/:username" element={<InactivePage />} />
      </Routes>
    </Router>
  );
};

export default App;