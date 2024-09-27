// models/userModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface representing a User document in MongoDB
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string; // Possible values: "admin", "user", "moderator", etc.
    permissions?: string[]; // Optional field for additional permissions
    status: string; // e.g., "active", "inactive"
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' }, // Default role is "user"
    permissions: { type: [String], default: [] }, // Array of strings for extra permissions
    status: { type: String, default: 'active' }, // Default status is "active"
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as any);
    }
});

// Method to compare provided password with hashed password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

// Export the User model
const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;

