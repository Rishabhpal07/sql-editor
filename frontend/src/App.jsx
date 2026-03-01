import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import AssignmentList from './pages/AssignmentList';
import AttemptPage from './pages/AttemptPage';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AssignmentList />} />
          <Route path="/assignment/:id" element={<AttemptPage />} />
        </Routes>
      </div>
    </Router>
  );
}
