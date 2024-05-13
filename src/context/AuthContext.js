import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const URI = 'https://backend-s-a-p-s.vercel.app';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [alumnoInfo, setAlumnoInfo] = useState(null);

  useEffect(() => {
    const getAlumnoInfo = async (userId, token) => {
      try {
        const response = await axios.get(`${URI}/alumnos/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAlumnoInfo(response.data);
      } catch (error) {
        console.error('Error: No es posible obtener la información del alumno', error);
      }
    };

    if (user && user.userType === 'alumno') {
      getAlumnoInfo(user.userId, token); // Agrega token como argumento
    }
  }, [user, token]); // Agrega user y token al arreglo de dependencias

  const login = async (rut, contraseña) => {
    try {
      const response = await axios.post(`${URI}/api/auth/login`, { rut, contraseña });
      const { token } = response.data;
      setUser(response.data);
      setToken(token);
    } catch (error) {
      console.error('Error: No es posible iniciar sesión', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, alumnoInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
