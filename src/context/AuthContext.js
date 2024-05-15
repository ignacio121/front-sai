import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


//const URI = 'https://backend-s-a-p-s.vercel.app';
const URI = 'http://localhost:3001'

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [sesion, setSesion] = useState(null);
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (sesion && sesion.userType === 'personal') {
      getPersonalInfo(sesion.userId, token); 
    }

    if (sesion && sesion.userType === 'alumno') {
      getAlumnoInfo(sesion.userId, token); 
    }
  }, [sesion, token]);

  const login = async (rut, contraseña) => {
    try {
      const response = await axios.post(`${URI}/api/auth/login`, { rut, contraseña });
      const { token } = response.data;
      setSesion(response.data);
      setToken(token);
    } catch (error) {
      console.error('Error: No es posible iniciar sesión', error);
    }
  };

  const logout = () => {
    setSesion(null);
    setToken(null);
  };

  const getAlumnoInfo = async (userId, token) => {
    try {
      const response = await axios.get(`${URI}/alumnos/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error: No es posible obtener la información del alumno', error);
    }
  };

  const getPersonalInfo = async (userId, token) => {
    try {
      const response = await axios.get(`${URI}/personal/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error: No es posible obtener la información del alumno', error);
    }
  };


  return (
    <AuthContext.Provider value={{ sesion, token, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
