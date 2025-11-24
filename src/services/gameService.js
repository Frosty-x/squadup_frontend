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
    }

}
export default gameService;