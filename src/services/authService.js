import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const authService = {
  /**
   * Registrar un nuevo usuario
   * @param {Object} userData - Datos del usuario (name, email, password, role)
   * @returns {Promise} Response con datos del usuario y tokens
   */
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al registrar usuario' };
    }
  },

  /**
   * Iniciar sesión
   * @param {Object} credentials - Credenciales (email, password)
   * @returns {Promise} Response con datos del usuario y tokens
   */
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al iniciar sesión' };
    }
  },

  /**
   * Refrescar el token de acceso
   * @param {string} refreshToken - Token de refresco
   * @returns {Promise} Response con nuevos tokens
   */
  async refreshToken(refreshToken) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/refresh`, { refreshToken });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al refrescar token' };
    }
  },

  /**
   * Cerrar sesión
   * @param {string} refreshToken - Token de refresco a invalidar
   * @returns {Promise} Response de confirmación
   */
  async logout(refreshToken) {
    try {
      const response = await axios.post(`${API_URL}/api/auth/logout`, { refreshToken });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al cerrar sesión' };
    }
  },

  /**
   * Verificar token de acceso
   * @param {string} accessToken - Token de acceso
   * @returns {Promise} Response con datos del usuario
   */
  async verifyToken(accessToken) {
    try {
      const response = await axios.get(`${API_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al verificar token' };
    }
  },

  /**
   * Guardar tokens en localStorage
   * @param {string} accessToken - Token de acceso
   * @param {string} refreshToken - Token de refresco
   */
  saveTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  /**
   * Obtener token de acceso del localStorage
   * @returns {string|null} Token de acceso
   */
  getAccessToken() {
    return localStorage.getItem('accessToken');
  },

  /**
   * Obtener token de refresco del localStorage
   * @returns {string|null} Token de refresco
   */
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  },

  /**
   * Eliminar tokens del localStorage
   */
  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  /**
   * Guardar datos del usuario en localStorage
   * @param {Object} user - Datos del usuario
   */
  saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Obtener datos del usuario del localStorage
   * @returns {Object|null} Datos del usuario
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Eliminar datos del usuario del localStorage
   */
  clearUser() {
    localStorage.removeItem('user');
  }
};

export default authService;
