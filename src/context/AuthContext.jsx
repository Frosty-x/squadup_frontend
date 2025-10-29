import React, { createContext, useEffect, useState } from 'react'
import authService from '../services/authService';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                try {
                    const response = await authService.getCurrentUser();
                    setUser(response.data); // ✅ Adjust based on your API response structure
                } catch (error) {
                    console.error('Failed to get user:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

  const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            setUser(response.data.user); // ✅ Fixed to access user object
        } catch (error) {
            console.error('Registration failed:', error);
            throw error; // ✅ Re-throw for component handling
        }
    }

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            setUser(response.data.user); // ✅ Fixed to access user object
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // ✅ Re-throw for component handling
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };


    const value = {
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}