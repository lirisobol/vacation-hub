import axios from "axios";

class Interceptors {
    public listen() {
        axios.interceptors.request.use(request => {
            const token = sessionStorage.getItem("token");
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        });
    }
}
export const interceptors = new Interceptors();