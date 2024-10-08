
import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class LikeService {
    async likeVacation(vacationId: string): Promise<void> {
        const endpoint = `${appConfig.baseLikesUrl}${vacationId}`;
        await axios.post(endpoint);
    }

    async unlikeVacation(vacationId: string): Promise<void> {
        const endpoint = `${appConfig.baseLikesUrl}${vacationId}`;
        await axios.delete(endpoint);
    }

    async checkIfUserLiked(vacationId: string): Promise<boolean> {
        const response = await axios.get<boolean>(`${appConfig.baseLikesUrl}check/${vacationId}`);
        return response.data;
    }

    async getNumberOfLikes(vacationId: string): Promise<number> {
        const response = await axios.get<number>(`${appConfig.baseLikesUrl}count/${vacationId}`);
        return response.data;
    }
}

export const likeService = new LikeService();





