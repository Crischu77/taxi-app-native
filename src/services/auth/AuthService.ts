import axios from 'axios';
import StorageService from '../storage/StorageService';
import { User } from '@/types';

const AUTH_API_URL = process.env.API_BASE_URL || 'https://api.yourapp.com';

class AuthService {
  async register(
    email: string,
    password: string,
    name: string,
    phone: string,
    cuit: string
  ): Promise<User> {
    try {
      const response = await axios.post(`${AUTH_API_URL}/auth/register`, {
        email,
        password,
        name,
        phone,
        cuit,
      });

      const { user, token } = response.data;
      await StorageService.setAuthToken(token);
      await StorageService.setUser(user);

      return user;
    } catch (error) {
      throw new Error('Error en registro: ' + (error as any).message);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await axios.post(`${AUTH_API_URL}/auth/login`, {
        email,
        password,
      });

      const { user, token } = response.data;
      await StorageService.setAuthToken(token);
      await StorageService.setUser(user);

      return user;
    } catch (error) {
      throw new Error('Error en login: ' + (error as any).message);
    }
  }

  async logout(): Promise<void> {
    try {
      await StorageService.removeAuthToken();
      await StorageService.removeUser();
    } catch (error) {
      throw new Error('Error en logout: ' + (error as any).message);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      return await StorageService.getUser();
    } catch (error) {
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await StorageService.getAuthToken();
    return !!token;
  }

  async updateProfile(name: string, phone: string): Promise<User> {
    try {
      const response = await axios.put(`${AUTH_API_URL}/auth/profile`, {
        name,
        phone,
      });

      const user = response.data;
      await StorageService.setUser(user);

      return user;
    } catch (error) {
      throw new Error('Error actualizando perfil: ' + (error as any).message);
    }
  }
}

export default new AuthService();
