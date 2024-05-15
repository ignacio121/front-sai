import React from 'react';
import Login from './pages/login.jsx';
import PersonalPage from './pages/personal.jsx';
import EstudiantePage from './pages/estudiante.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './context/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/estudiante" element={<EstudiantePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
