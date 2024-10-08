import express, { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth-service';
import { StatusCode } from '../models/enums';
import { UserAttrs } from '../models/user-model';
import { CredentialsModel } from '../models/credentials-model';
import { UnauthorizedError, ValidationError } from '../models/client-errors';

class AuthController {
    public readonly router = express.Router();

    public constructor() {
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.post('/register', this.register);
        this.router.post('/login', this.login);
    }

    private async register(request: Request, response: Response, next: NextFunction): Promise<void> {        
        try {
            const userAttrs: UserAttrs = request.body;
            const token = await authService.register(userAttrs);
            response.status(StatusCode.Created).json({ token });
        } 
        catch (err: any) {
            if (err instanceof ValidationError) {
                response.status(StatusCode.BadRequest).json({ message: err.message });
            } 
            else {
                next(err);
            }
        }
    }
    
    private async login(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const credentials = new CredentialsModel(request.body);
            const token = await authService.login(credentials);
            response.json({ token });
        } 
        catch (err: any) {
            if(err instanceof UnauthorizedError) {
                response.status(StatusCode.Unauthorized).json({ message: err.message });
            }
            else {
                next(err)
            }
        }
    }
}

const authController = new AuthController();
export const authRouter = authController.router;
