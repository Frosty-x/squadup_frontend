import api from "./api";

const authService = {
    register: async (userData) => {
        try {
            const response = await api.post('/user/signup', userData);
            localStorage.setItem('token', response.data.data.token);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/user/login', credentials);
            localStorage.setItem('token', response.data.data.token);
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/user/profile/me');
            return response.data;
        } catch (error) {
            console.error('Get current user failed:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    updateProfilePic: async (profilePic) => {
        try {
            const response = await api.put('/user/profile/picture', profilePic);
            return response.data;
        }
        catch (error) {
            console.error('Get current user failed:', error);
            throw error;
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/user/profile/update', profileData);
            return response.data;
        }
        catch (error) {
            console.error('Get current user failed:', error);
            throw error;
        }
    }


}

export default authService;