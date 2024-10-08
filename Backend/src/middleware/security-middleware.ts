import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../models/client-errors";
import { auth } from "../utils/auth";
import jwt from 'jsonwebtoken';


class SecurityMiddleware {

    // Verify user logged in (authorization: "Bearer <the-token>"):
    //                                        01234567
    public verifyLoggedIn(request: Request, response: Response, next: NextFunction): void {

        // Get authorization header: 
        const authorizationHeader = request.header("authorization");

        // Get the token:
        const token = authorizationHeader?.substring(7); // 7 --> token index

        // If token not valid:
        if (!auth.isTokenValid(token)) { 
            const err = new UnauthorizedError("You are not logged in.");
            next(err);
            return;
        }
        next();}
    // Verify admin:
    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {

        // Get authorization header: 
        const authorizationHeader = request.header("authorization");

        // Get the token:
        const token = authorizationHeader?.substring(7); // 7 --> token index

        // If user is not admin:
        if (!auth.isAdmin(token)) {
            const err = new UnauthorizedError("You are not authorized.");
            next(err);
        }
        else {
            next();
        }
    };

    public extractUserId(request: Request, response: Response, next: NextFunction): void {
        // Get authorization header: 
        const authorizationHeader = request.header("authorization");

        // Get the token:
        const token = authorizationHeader?.substring(7); // 7 --> token index
        
        if (!token) {
            const err = new UnauthorizedError("No token provided.");
            next(err);
            return;
        }

        try {
            const decoded = auth.decodeToken(token);
            
            if (!decoded || !decoded.id) {
                throw new Error("Invalid token");
            }

            // Attach userId to response.locals
            response.locals.userId = decoded.id;
            next();
        } 
        catch (error:any) {
            const unauthorizedError = new UnauthorizedError("Invalid token.");
            next(unauthorizedError);
        }
        
    }
}

export const securityMiddleware = new SecurityMiddleware();
