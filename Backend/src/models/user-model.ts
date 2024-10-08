import mongoose from 'mongoose';
import { RoleModel } from './role-model';

export interface UserAttrs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleModel;
}

export interface UserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleModel;
}

export interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Missing First Name"],
        max: [100, "First Name Can't Exceed 150 Characters"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Missing Last Name"],
        max: [100, "Last Name Can't Exceed 100 Characters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Missing Email Address"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            // regex validation for email address format, GPT's.
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please fill a valid email address'
        }
    },

    password: {
        type: String,
        required: [true, "Missing Password"],
        minLength: [4, "Password Must Be Longer Than 4 Characters"]
    },

    role: {
        type: Number,
        required: true,
        enum: RoleModel
    }
    
},{
    id:false,
    versionKey: false,
    timestamps: true,
    toJSON:{virtuals:true}
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};
export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
