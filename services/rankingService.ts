import { rankingRepository } from "../repositories/rankingRepository.js";

async function getRanking() {
    const { rows } = await rankingRepository.select();

    if (rows.length !== 0) {
        return rows;
    } else {
        throw {
            type: "not found",
            message: "empty list"
        };        
    }
}

export const rankingService = {
    getRanking
}