// src/routes/userRoutes.ts
import { Router } from 'express';
import { isAuthenticated, authorizeRole, logoutUser, loginRateLimiter, requestLogger } from '../middleware/userAuth';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    assignRole,
    changePassword,
    loginUser
} from '../controllers/userController';

const router = Router();

// Apply request logging middleware to all routes
router.use(requestLogger);

// Login route with rate limiting
router.post('/users/login', loginRateLimiter, loginUser);

// Create a new user (admin only)
router.post('/users', isAuthenticated, authorizeRole('admin'), createUser);
// router.post('/users', createUser);

// Get all users (admin only)
router.get('/users', isAuthenticated, authorizeRole('admin'), getAllUsers);
// router.get('/users', getAllUsers);

// Log out a user
router.post('/logout', isAuthenticated, logoutUser);

// Get a specific user by ID (admin only)
router.get('/users/:id', isAuthenticated, authorizeRole('admin'), getUserById);

// Update a user by ID (admin only)
router.put('/users/:id', isAuthenticated, authorizeRole('admin'), updateUser);

// Delete a user by ID (admin only)
router.delete('/users/:id', isAuthenticated, authorizeRole('admin'), deleteUser);

// Assign a role to a user by ID (admin only)
router.patch('/users/:id/role', isAuthenticated, authorizeRole('admin'), assignRole);

// Change password for a user by ID (authenticated users can change their own password)
router.patch('/users/:id/password', isAuthenticated, changePassword);

export default router;

