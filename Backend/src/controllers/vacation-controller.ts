import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../models/enums";
import { vacationService } from "../services/vacation-service";
import { VacationModel } from "../models/vacation-model";
import { securityMiddleware } from "../middleware/security-middleware";
import { fileSaver } from "uploaded-file-saver";
import { UploadedFile } from "express-fileupload";

// Data controller:
class VacationController {
    // Create a router object for listening to HTTP requests:
    public readonly router = express.Router();
    // Register routes once: 
    public constructor() {
        this.registerRoutes();
    };
    // Register routes:
    private registerRoutes(): void {
        this.router.get("/vacations/:id([0-9a-fA-F]{24})", securityMiddleware.verifyLoggedIn, this.getVacationById);
        this.router.get("/vacations", securityMiddleware.verifyLoggedIn,securityMiddleware.extractUserId,this.getAllVacations);
        this.router.post("/vacations", securityMiddleware.verifyAdmin, this.addVacation);
        this.router.delete("/vacations/:id([0-9a-fA-F]{24})", securityMiddleware.verifyAdmin, this.deleteVacation);
        this.router.put("/vacations/:id([0-9a-fA-F]{24})", securityMiddleware.verifyAdmin, this.updateVacation);
        this.router.get("/vacations/images/:imageName", this.getImageFile);
    };
    // GET http://localhost:4000/api/vacations/:id
    private async getVacationById(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacationId = request.params.id;
            const vacation = await vacationService.getVacationById(vacationId);
            response.json(vacation);
        } 
        catch (err:any) {next(err)}
    }
    // GET http://localhost:4000/api/vacations
    private async getAllVacations(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const userId = response.locals.userId;
            const vacations = await vacationService.getAllVacations(userId);
            response.json(vacations);
        } 
        catch (err:any) {next(err)}
    }
    // Add Vacation
    // POST http://localhost:4000/api/vacations
    private async addVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const imageFile = request.files?.image as UploadedFile;            
            const vacation = new VacationModel(request.body); // Create a new vacation object
            // Check if image file is provided
            if (imageFile) {
                vacation.imageName = imageFile.name; // Set the imageName if file is provided
            }
            const addedVacation = await vacationService.addVacation(vacation, imageFile); // Save vacation to MongoDB, pass imageFile if available
            response.status(StatusCode.Created).json(addedVacation);
        } 
        catch (err:any) {next(err)}
    };

    // PUT http://localhost:4000/api/vacations/:id
    private async updateVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacationId = request.params.id; // Vacation ID from URL 
            const updatedVacationData = request.body;
            const imageFile = request.files?.image as UploadedFile; // New image file, if provided
            const updatedVacation = await vacationService.updateVacation(vacationId, updatedVacationData, imageFile);
            response.status(StatusCode.OK).json(updatedVacation);
        } 
        catch (err: any) {next(err)}
    };

    // Delete Vacation
    // DELETE http://localhost:4000/api/vacations/:id
    private async deleteVacation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const vacationId = request.params.id; // the vacation ID is passed as a URL parameter
            await vacationService.deleteVacation(vacationId);
            response.status(StatusCode.OK).send(`Vacation with ID ${vacationId} was successfully deleted.`);
        }
        catch (err: any) {next(err)}
    };

    // GET http://localhost:4000/api/vacations/images/:imageName
    private async getImageFile(request: Request, response: Response, next:NextFunction): Promise<void> {
        try {
            const imageName = request.params.imageName;
            const imagePath = fileSaver.getFilePath(imageName, true);
            console.log("fetching image", new Date());
            
            response.sendFile(imagePath);
        }
        catch (err:any) {next(err);}
    }
}
const vacationController = new VacationController();
export const vacationRouter = vacationController.router;
