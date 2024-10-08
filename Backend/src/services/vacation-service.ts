import { fileSaver } from "uploaded-file-saver";
import { ResourceNotFoundError, ValidationError } from "../models/client-errors";
import { IVacationModel, VacationModel } from "../models/vacation-model";
import { UploadedFile } from "express-fileupload";
import mongoose from "mongoose";
class VacationService {
    public async getVacationById(vacationId: string): Promise<IVacationModel> {
        const vacation = await VacationModel.findById(vacationId).populate("likes").exec();
        return vacation;
    }
    // Fetches all vacations along with their like counts and whether the current user has liked each.
    public async getAllVacations(userId: string): Promise<IVacationModel[]>{
        const vacations = await VacationModel.aggregate([
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "vacationId",
                    as: "likes"
                }
            },
            {
                $addFields: {
                    likesCount: { $size: "$likes" },
                    isLiked: {
                        $anyElementTrue: {
                            $map: {
                                input: "$likes",
                                as: "like",
                                in: { $eq: ["$$like.userId", new mongoose.Types.ObjectId(userId)] }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    likes: 0 // This will exclude only the 'likes' field and include all other fields by default.
                }
            }
        ]).exec();
        return vacations;
    }
    
    // Add Vacation
    public async addVacation(vacationData: IVacationModel, imageFile?: UploadedFile): Promise<IVacationModel> {
        // If an image file is provided, save it and update the imageName in vacationData
        if (imageFile) {
            vacationData.imageName = await fileSaver.add(imageFile);
        }
        // If no image file is provided, imageName in vacationData will remain as it is
        
        // Create And Validate Mongo Model
        const vacation = new VacationModel(vacationData);
        const errors = vacation.validateSync();
        if(errors) throw new ValidationError(errors.message);
        return vacation.save();
    }

   // Update Vacation
    public async updateVacation(vacationId: string, updatedVacationData: IVacationModel, imageFile?: UploadedFile): Promise<IVacationModel> {
        // Get the current image name from the vacation
        const oldImageName = await this.getImageName(vacationId);
    
        // Process the image file if provided
        if (imageFile) {
            let imageName;
    
            // If there's an existing image, update it; otherwise, add a new one
            if (oldImageName) {
                imageName = await fileSaver.update(oldImageName, imageFile);
            } 
            else {
                imageName = await fileSaver.add(imageFile);
            }
            // Update the imageName in vacation data
            updatedVacationData.imageName = imageName;
        }
        // Update the vacation in the database
        const vacation = await VacationModel.findByIdAndUpdate(
            vacationId,
            updatedVacationData,
            { new: true, runValidators: true }
        ).exec();
        if (!vacation) {
            throw new ResourceNotFoundError('Vacation not found');
        }
        return vacation;
    } 
    //. Delete Vacation
    public async deleteVacation(vacationId: string): Promise<void> {
        const result = await VacationModel.deleteOne({ _id: vacationId }).exec();
        if (result.deletedCount === 0) {
            throw new Error('Vacation not found');
        }
    };
    private async getImageName(vacationId: string): Promise<string> {
        const vacation = await VacationModel.findById(vacationId).exec();
        return vacation ? vacation.imageName : null;
    };
};
export const vacationService = new VacationService();
