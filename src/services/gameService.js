import api from "./api";

const gameService = {
    createGame: async (gameData) => {
        try {
            const response = await api.post('/game/create', gameData);
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Failed to create game');
        }
    },
    getAllGames: async () => {
        try {
            const response = await api.get("/game/all");
            return response.data;

        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to fetch games');

        }
    },
    getMyGames: async () => {
        try {
            const response = await api.get('/game/myGames');
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch my games')
        }
    },
    getJoinedGames: async () => {
        try {
            const response = await api.get('/game/join')
            return response.data
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch joined games')
        }
    },
    getUpcomingGames: async () => {
        try {
            const response = await api.get('/game/upcoming');
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch joined games')

        }
    },
    getPastGames: async () => {
        try {
            const response = await api.get('/game/past');
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch joined games')

        }
    },

    joinGame: async (gameId) => {
        try {
            const response = await api.put(`/game/join/${gameId}`)
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to join game')
        }
    }

}
export default gameService;