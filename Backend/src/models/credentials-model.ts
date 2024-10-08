import { ValidationError } from "./client-errors";

export class CredentialsModel {
    public email: string;
    public password: string;

    constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
        this.validate();
    }

    private validate(): void {
        if (!this.email) {
            throw new ValidationError("Email is required.");
        }
        // Basic email regex pattern for validation
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
            throw new ValidationError("Invalid email address.");
        }
        if (!this.password) {
            throw new ValidationError("Password is required.");
        }
        if (this.password.length < 4) {
            throw new ValidationError("Password must be at least 4 characters long.");
        }
    }
}
