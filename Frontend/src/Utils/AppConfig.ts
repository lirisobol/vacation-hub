class AppConfig {

    // Login:
    public readonly loginUrl = "http://127.0.0.1:4000/api/login/"
    // Register:
    public readonly registerUrl = "http://127.0.0.1:4000/api/register/"

    // Vacations URL's
    public readonly vacationsUrl = "http://127.0.0.1:4000/api/vacations/"

    // Base Image URL 
    public readonly baseImageUrl = "http://127.0.0.1:4000/api/vacations/images/";

    // Base Likes URL
    public readonly baseLikesUrl = "http://127.0.0.1:4000/api/likes/";
    
    //Axios options:
    public readonly axiosOptions = {
        headers: { // Tell axios to also send the image:
            "Content-Type": "multipart/form-data" // We're sending also files.
        }
    };
}

export const appConfig = new AppConfig();
