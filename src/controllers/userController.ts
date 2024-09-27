import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

// Helper function for handling validation errors
const handleValidationErrors = (req: Request) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return { valid: false, errors: errors.array() };
    }
    return { valid: true };
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user._id as string;
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User By ID
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Omit password from the response
        const { password, ...userData } = user.toObject();
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const validation = handleValidationErrors(req);
    if (!validation.valid) {
        return res.status(400).json({ errors: validation.errors });
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { username, email, role }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...userData } = updatedUser.toObject();
        res.status(200).json({ message: 'User updated successfully', user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Change Password
export const changePassword = async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (req.session.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden: You can only change your own password' });
    }

    const { oldPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid old password' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search Users
export const searchUsers = async (req: Request, res: Response) => {
    const { query } = req.query;

    try {
        const users = await UserModel.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('-password'); // Exclude password from results

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Assign Role
export const assignRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { role }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Role assigned successfully', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create User
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, email, role, permissions, status } = req.body;

        // Create a new user instance
        const newUser = new UserModel({
            username,
            password,
            email,
            role, // Ensure this is set from the request
            permissions,
            status
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error});
    }
};

// Get All Users with Pagination
export const getAllUsers = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query; // Default pagination values

    try {
        const users = await UserModel.find()
            .skip((Number(page) - 1) * Number(limit)) // Calculate the number of users to skip
            .limit(Number(limit))
            .select('-password'); // Exclude password from results

        const totalUsers = await UserModel.countDocuments();
        res.status(200).json({ totalUsers, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

