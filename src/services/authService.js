import api from "./api";

const authService = { // ✅ Fixed typo from "authSevice"
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            localStorage.setItem('token', response.data.data.token);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            localStorage.setItem('token', response.data.data.token);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            console.error('Get current user failed:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    }
}

export default authService;