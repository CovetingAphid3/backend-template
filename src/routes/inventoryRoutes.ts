// routes/inventoryRoutes.ts
import { Router } from 'express';
import {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
} from '../controllers/inventoryController/inventoryController';


import { createCategory,getAllCategories,getCategoryById } from '../controllers/inventoryController/categoryContoller';

const router = Router();

router.post('/category',createCategory)
router.get('/category', getAllCategories)
router.get('/category/:id',getCategoryById)

router.get('/items', getAllItems);       // Fetch all items
router.get('/items/:id', getItemById);   // Fetch a single item by ID
router.post('/items', createItem);       // Create a new item
router.put('/items/:id', updateItem);    // Update an item by ID
router.delete('/items/:id', deleteItem); // Delete an item by ID

export default router;

