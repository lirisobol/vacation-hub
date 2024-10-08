import { notify } from "../Utils/Notify";
import axios from "axios";
import UserModel from "../Models/UserModel";
import CredentialsModel from "../Models/CredentialsModel";
import { authActionCreators } from "../Redux/Slices/AuthSlice";
import { appStore } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";
import {jwtDecode} from "jwt-decode";

class AuthService {
    public constructor() {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const loggedInUser = jwtDecode<UserModel>(token);
                appStore.dispatch(authActionCreators.login(loggedInUser));
            } 
            catch (err:any) {
                notify.error(err);
                this.logout();  // Clear the invalid session
            }
        }
    }
    public async register(user: UserModel): Promise<void> {
        try {
            const response = await axios.post<{ token: string }>(appConfig.registerUrl, user);
            const token = response.data.token;
            const registeredUser = jwtDecode<UserModel>(token);
    
            appStore.dispatch(authActionCreators.register(registeredUser));
            sessionStorage.setItem("token", token);
        } 
        catch (err:any) {
            throw new Error(err.response?.data.message)
        }
    }
    public async login(credentials: CredentialsModel): Promise<void> {
        try {
            const response = await axios.post<{ token: string }>(appConfig.loginUrl, credentials);
            const token = response.data.token;
            const userPayload = jwtDecode<UserModel>(token);
            appStore.dispatch(authActionCreators.login(userPayload));
            sessionStorage.setItem("token", token);
        } 
        catch (err:any) {
            throw new Error(err.response?.data.message)
        }
    }
    public logout(): void {
        appStore.dispatch(authActionCreators.logout());
        sessionStorage.removeItem("token");
    }
}

export const authService = new AuthService();
