export default class CredentialsModel {
    public email: string = "";
    public password: string = "";

    public static emailValidation = {
        required: { value: true, message: "Email is required" },
        pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Invalid email format"
        }
    };

    public static passwordValidation = {
        required: { value: true, message: "Password is required" },
        minLength: {
            value: 4,
            message: "Password must be at least 4 characters long"
        }
    };
}
