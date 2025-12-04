import api from "./api";

const gameService = {
    createGame: async (gameData) => {
        try {
            const response = await api.post('/game/create', gameData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },
    getAllGames: async () => {
        try {
            const response = await api.get("/game/all");
            return response.data;

        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },
    getMyGames: async () => {
        try {
            const response = await api.get('/game/myGames');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },
    getJoinedGames: async () => {
        try {
            const response = await api.get('/game/join')
            return response.data
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },
    getUpcomingGames: async () => {
        try {
            const response = await api.get('/game/upcoming');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },
    getPastGames: async () => {
        try {
            const response = await api.get('/game/past');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },

    joinGame: async (gameId) => {
        try {
            const response = await api.put(`/game/join/${gameId}`)
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },
    getGameById: async (gameId) => {
        try {
            const response = await api.get(`/game/${gameId}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },
    leaveGame: async (gameId) => {
        try {
            const response = await api.put(`/game/leaveGame/${gameId}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    },
    cancelGame: async (gameId) => {
        try {
            const response = await api.put(`/game/cancel/${gameId}`);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create game';
            throw new Error(message);
        }
    }

}
export default gameService;