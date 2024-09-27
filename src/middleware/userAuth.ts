// src/middleware/userAuth.ts
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import rateLimit from 'express-rate-limit';
import { Logger } from '../utils/logger'; // Ensure you have a logger utility

// Extend the Session interface from express-session directly here
declare module 'express-session' {
    interface SessionData {
        userId?: string; // Add your custom property here
    }
}

// Middleware to log requests
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    Logger.info(`${req.method} ${req.url}`);
    next();
};

// Rate limiting middleware for login route
export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: { message: 'Too many login attempts, please try again later.' }
});

// Middleware to check if the user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
        return next(); // User is authenticated
    } else {
        return res.status(401).json({ message: 'Unauthorized: Please log in to access this resource' });
    }
};

// Middleware to check if the user has the required role
export const authorizeRole = (requiredRole: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.session || !req.session.userId) {
                return res.status(401).json({ message: 'Unauthorized: Please log in' });
            }

            const user = await UserModel.findById(req.session.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (user.role !== requiredRole) {
                return res.status(403).json({ message: 'Forbidden: You do not have the required permissions' });
            }

            next(); // Role matches, proceed to the next middleware
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    };
};

// Middleware to log out a user
export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

