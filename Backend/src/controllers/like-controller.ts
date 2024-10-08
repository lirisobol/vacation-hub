import express, { Request, Response, NextFunction} from "express";
import { likeService } from "../services/like-service";
import { StatusCode } from "../models/enums";
import { securityMiddleware } from "../middleware/security-middleware";

class LikeController {
    public router = express.Router();

    constructor() {
        this.registerRoutes();
    }

    private registerRoutes() {
        this.router.post("/likes/:vacationId", securityMiddleware.extractUserId, this.likeVacation);
        this.router.delete("/likes/:vacationId", securityMiddleware.extractUserId, this.unlikeVacation);
        this.router.get("/likes/count/:vacationId",securityMiddleware.extractUserId, this.getNumberOfLikes);
        this.router.get("/likes/check/:vacationId", securityMiddleware.extractUserId, this.checkIfUserLiked);
    }

    private async likeVacation(request: Request, response: Response, next: NextFunction) {
        try {
            // Catching the User ID set by the SecurityMiddleware.ExtractUserId Middleware.
            const userId = response.locals.userId;
            const { vacationId } = request.params;
            await likeService.likeVacation(userId, vacationId);
            response.status(StatusCode.Created).send();
        } 
        catch (err:any) {next(err)}
    }
    
    private async unlikeVacation(request: Request, response: Response, next: NextFunction) {
        try {
            // Catching the User ID set by the SecurityMiddleware.ExtractUserId Middleware.
            const userId = response.locals.userId;
            const { vacationId } = request.params;
            await likeService.unLikeVacation(userId, vacationId);
            response.status(StatusCode.OK).send();
        } 
        catch (err:any) {next(err)}
    }

    private async getNumberOfLikes(request: Request, response: Response, next: NextFunction) {
        try {
            const { vacationId } = request.params;
            const numberOfLikes = await likeService.getNumberOfLikes(vacationId);
            response.json(numberOfLikes);
        } 
        catch (err:any) {next(err)}
    }
    
    private async checkIfUserLiked(request: Request, response: Response, next: NextFunction) {
        try {
            // Catching the User ID set by the SecurityMiddleware.ExtractUserId Middleware.
            const userId = response.locals.userId;
            const { vacationId } = request.params;
            const isLiked = await likeService.isUserLikes(userId, vacationId);            
            response.json(isLiked);
        } 
        catch (err:any) {next(err)}
    }
}

export const likeController = new LikeController();
export const likeRouter = likeController.router;