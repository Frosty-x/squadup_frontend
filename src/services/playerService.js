import api from "./api";

const playerService = {
    getPlayers: async () => {
        try {
            const response = await api.get("/players/getPlayers");
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch available players')
        }
    }
}

export default playerService;