import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar usuario y tokens al iniciar la aplicación
  useEffect(() => {
    const loadAuthData = () => {
      const savedUser = authService.getUser();
      const accessToken = authService.getAccessToken();
      
      if (savedUser && accessToken) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };

    loadAuthData();
  }, []);

  /**
   * Registrar un nuevo usuario
   * @param {Object} userData - Datos del usuario (name, email, password, role)
   * @returns {Promise} Resultado del registro
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.success && response.data) {
        const { user: newUser, tokens } = response.data;
        
        // Guardar tokens y usuario
        authService.saveTokens(tokens.accessToken, tokens.refreshToken);
        authService.saveUser(newUser);
        
        // Actualizar estado
        setUser(newUser);
        setIsAuthenticated(true);
        
        return { success: true, message: response.message };
      }
      
      return { success: false, message: response.message || 'Error al registrar' };
    } catch (error) {
      console.error('Error en registro:', error);
      return { 
        success: false, 
        message: error.message || 'Error al registrar usuario' 
      };
    }
  };

  /**
   * Iniciar sesión
   * @param {Object} credentials - Credenciales (email, password)
   * @returns {Promise} Resultado del login
   */
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        const { user: loggedInUser, tokens } = response.data;
        
        // Guardar tokens y usuario
        authService.saveTokens(tokens.accessToken, tokens.refreshToken);
        authService.saveUser(loggedInUser);
        
        // Actualizar estado
        setUser(loggedInUser);
        setIsAuthenticated(true);
        
        return { success: true, message: response.message };
      }
      
      return { success: false, message: response.message || 'Error al iniciar sesión' };
    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        message: error.message || 'Error al iniciar sesión' 
      };
    }
  };

  /**
   * Cerrar sesión
   * @returns {Promise} Resultado del logout
   */
  const logout = async () => {
    try {
      const refreshToken = authService.getRefreshToken();
      
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar tokens y usuario del localStorage
      authService.clearTokens();
      authService.clearUser();
      
      // Actualizar estado
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  /**
   * Refrescar el token de acceso
   * @returns {Promise} Resultado del refresh
   */
  const refreshAccessToken = async () => {
    try {
      const refreshToken = authService.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No hay refresh token disponible');
      }
      
      const response = await authService.refreshToken(refreshToken);
      
      if (response.success && response.data) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        
        // Guardar nuevos tokens
        authService.saveTokens(accessToken, newRefreshToken || refreshToken);
        
        return { success: true };
      }
      
      // Si falla el refresh, hacer logout
      await logout();
      return { success: false };
    } catch (error) {
      console.error('Error al refrescar token:', error);
      await logout();
      return { success: false };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    refreshAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
