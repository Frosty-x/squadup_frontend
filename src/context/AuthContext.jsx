import { createContext, useEffect, useState } from 'react';
import authService from '../services/authService';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await authService.getCurrentUser();
                    setUser(response.data);
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
            setUser(response.data);
            return response;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            setUser(response.data);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const refreshUser = async () => {
        try {
            const response = await authService.getCurrentUser();
            setUser(response.data);
            return response;
        } catch (error) {
            console.error('Failed to refresh user:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };
    const updateProfilePic = async(newprofilePic) => {
        try {
        const response = await authService.updateProfilePic(newprofilePic)
         setUser(response.data)
         return response
        } catch (error) {
            console.error('Failed to update Priofile pic',error);
            throw error
        }
    }
    const updateProfile = async(newProfileData) => {
        try {
            const response = await authService.updateProfile(newProfileData)
            setUser (response.data)
            return response
        } catch (error) {
            console.error('Failed to update Users Information',error);
            throw error
        }
    }

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        refreshUser,
        updateProfilePic,
        updateProfile,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};