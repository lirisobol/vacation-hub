import { Schema, model } from "mongoose";
import { LikeModel } from "./like-model";

// 1. Document
export interface IVacationModel extends Document {
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageName: string;
};

// 2. Schema
export const VacationSchema = new Schema<IVacationModel>({
    destination: {
        type:String,
        required: [true, "Missing Destination"],
    },
    description: {
        type:String,
        required: [true, "Missing Description"],
    },
    startDate: {
        type:Date,
        required: [true, "Missing Start Date"],
    },
    endDate: { 
        type: Date, 
        required: true,
    },
    price: {
        type:Number,
        required: [false, "Missing Price"],
        min: [0, "Price Can't Be Negative"],
        max: [10000, "Price Can't Exceed 10,000"]
    },
    imageName: {
        type: String
    }
}, {versionKey: false,
    toJSON:{virtuals:true},
    id: false,
});

VacationSchema.virtual('likes', {
    ref: LikeModel, // This should match the name used in mongoose.model() for likes
    localField: '_id', // This should be the local key on the VacationModel
    foreignField: 'vacationId' // This should be the key on the LikeModel that refers to Vacation
});
// 4. Model
export const VacationModel = model<IVacationModel>("VacationModel", VacationSchema, "vacations");