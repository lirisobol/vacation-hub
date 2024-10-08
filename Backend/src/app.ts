import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./utils/app-config";
import { errorsMiddleware } from "./middleware/errors-middleware";
import { loggerMiddleware } from "./middleware/logger-middleware";
import { dal } from "./utils/dal";
import { vacationRouter } from "./controllers/vacation-controller";
import { authRouter } from "./controllers/auth-controller";
import { likeRouter } from "./controllers/like-controller";

// Main application class:
class App {

    // Express server: 
    private server = express();

    // Start app:
    public async start(): Promise<void> {

        // Enable CORS requests:
        this.server.use(cors()); // Enable CORS for any frontend website.

        // Create a request.body containing the given json from the front:
        this.server.use(express.json());

        // Create request.files containing uploaded files: 
        this.server.use(expressFileUpload());

        // Configure images folder: 
        fileSaver.config(path.join(__dirname, "assets", "images"));

        // Register middleware:
        this.server.use(loggerMiddleware.logToConsole);

        // Connect any controller route to the server:
        this.server.use("/api", authRouter, vacationRouter, likeRouter);

        // Route not found middleware: 
        this.server.use(errorsMiddleware.routeNotFound);
        // Connect to MongoDB:
        await dal.connect()
        // Catch all middleware: 
        this.server.use(errorsMiddleware.catchAll);
        this.server.listen(4000, '0.0.0.0', () => console.log("Listening on port " + appConfig.port));
    }

}

const app = new App();
app.start();
