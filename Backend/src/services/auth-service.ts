import { auth } from "../utils/auth";
import { UnauthorizedError, ValidationError } from "../models/client-errors";
import { CredentialsModel } from "../models/credentials-model";
import { RoleModel } from "../models/role-model";
import { User, UserAttrs } from "../models/user-model";


class AuthService {
    public async register(userAttrs: UserAttrs): Promise<string> {
        const existingUser = await User.findOne({ email: userAttrs.email });
        if (existingUser) {
            throw new ValidationError("Email already exists");
        }
        // Attempt to create a new user document to trigger validation
        const newUser = new User({
            ...userAttrs,
            role: RoleModel.User // Assuming default role assignment here
        });
        const validationError = newUser.validateSync();
        if (validationError) {
            throw new ValidationError(validationError.message);
        }
        // If validation passes, hash the password
        newUser.password = auth.hashPassword(userAttrs.password);

        // Save the user
        await newUser.save();

        // Create token
        const token = auth.getNewToken(newUser);

        // Return the token
        return token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {
        // Hash password for comparing the hashes:
        const hashedInputPassword = auth.hashPassword(credentials.password);

        // Check if the email exists in the database
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
            throw new UnauthorizedError("User not found");
        }

        // Compare hashed passwords
        if (hashedInputPassword !== user.password) {
            throw new UnauthorizedError("Invalid credentials");
        }

        // Generate and return a token
        return auth.getNewToken(user);
    }
}

export const authService = new AuthService();
