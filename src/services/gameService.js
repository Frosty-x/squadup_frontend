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
    getMyGames: async () => {
        try {
            const response = await api.get('/game/myGames');
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch my games')
        }
    }
}
export default gameService;