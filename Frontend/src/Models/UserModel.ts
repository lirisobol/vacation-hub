import { UserRole } from "./UserRole";

export default class UserModel {
    public id: number;
	public firstName: string;
	public lastName: string;
	public email: string;
	public password: string;
    public role: UserRole;

    public static firstNameValidation = {
        required: {value: true, message: "First name is required"},
        minLength: {value: 2, message: "First name must be at least 2 characters"},
        maxLength: {value: 30, message: "First name must be less than 30 characters"}
    };

    public static lastNameValidation = {
        required: {value: true, message: "Last name is required"},
        minLength: {value: 2, message: "Last name must be at least 2 characters"},
        maxLength: {value: 30, message: "Last name must be less than 30 characters"}
    };

    public static emailValidation = {
        required: {value: true, message: "Email is required"},
        pattern: {value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email format"}
    };

    public static passwordValidation = {
        required: {value: true, message: "Password is required"},
        minLength: {value: 4, message: "Password must be at least 4 characters"}
    };

};
