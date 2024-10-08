import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import crypto from "crypto";
import { UserDoc } from "../models/user-model";
import { RoleModel } from "../models/role-model";
class Auth {
    public getNewToken(user: UserDoc): string {
        const userPayload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        };
        const options: SignOptions = { expiresIn: "5h" };
        const token = jwt.sign(userPayload, appConfig.jwtSecretKey, options);

        return token;
    }
    public isTokenValid(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecretKey);
            return true;
        }
        catch (err: any) {
            return false;
        }
    }
    public isAdmin(token: string): boolean {
        const container = jwt.decode(token) as { id: string, role: RoleModel };
        return container?.role === RoleModel.Admin;
    }
    public hashPassword(plainText: string): string {
        const hashedPassword = crypto.createHmac("sha512", appConfig.passwordSalt).update(plainText).digest("hex");
        return hashedPassword;
    }
    public decodeToken(token: string): any {
        return jwt.decode(token);
    }

}

export const auth = new Auth();
