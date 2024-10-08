import mongoose, { Schema, model } from "mongoose";

export interface ILikeModel extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    vacationId: mongoose.Schema.Types.ObjectId;
};

export const LikeSchema = new Schema<ILikeModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User Model
        required: [true, "Must Include User Id"]
    },
    vacationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VacationModel', // Reference to Vacation Model
        required: [true, "Must Include Vacation Id"]
    }
});

// Compound index for userId and vacationId
LikeSchema.index({ userId: 1, vacationId: 1 }, { unique: true });

export const LikeModel = model<ILikeModel>("LikeModel", LikeSchema, "likes");
