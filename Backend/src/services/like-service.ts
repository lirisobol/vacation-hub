import { ILikeModel, LikeModel } from "../models/like-model";

export class LikeService {
    // Like a vacation
    public async likeVacation(userId: string, vacationId: string): Promise<void> {
        const Like: ILikeModel = new LikeModel({ userId, vacationId });
        await Like.save();
    }
    // Unlike a vacation
    public async unLikeVacation(userId: string, vacationId: string): Promise<void> {
        await LikeModel.deleteOne({ userId, vacationId });
    }
    // Get number of Likes for a vacation
    public async getNumberOfLikes(vacationId: string): Promise<number> {
        return LikeModel.countDocuments({ vacationId });
    }
    // Check if a user is following a vacation
    public async isUserLikes(userId: string, vacationId: string): Promise<boolean> {
        const count = await LikeModel.countDocuments({ userId, vacationId });
        return count > 0;
    }
}

export const likeService = new LikeService();