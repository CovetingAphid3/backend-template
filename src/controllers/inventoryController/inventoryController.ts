import {Request,Response} from 'express'
import ItemModel from '../../models/ItemModel';
import CategoryModel from '../../models/inventoryModels/categoryModel'
import SupplierModel from '../../models/inventoryModels/supplierModel';

// Create a new inventory item
export const createItem = async (req: Request, res: Response) => {
    try {
        const { name, category, supplier, quantity, price } = req.body;

        // Check if category and supplier exist
        const categoryExists = await CategoryModel.findById(category);
        const supplierExists = await SupplierModel.findById(supplier);

        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }
        if (!supplierExists) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Create a new item
        const newItem = new ItemModel({ name, category, supplier, quantity, price });
        await newItem.save();

        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create item', details: err });
    }
};

// Get all items
export const getAllItems = async (req: Request, res: Response) => {
    try {
        // Populate category and supplier fields to return full details
        const items = await ItemModel.find().populate('category supplier');
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items', details: err });
    }
};

// Get a single item by ID
export const getItemById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const item = await ItemModel.findById(id).populate('category supplier');
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch item', details: err });
    }
};

// Update an item
export const updateItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, category, supplier, quantity, price } = req.body;

        // Check if item exists
        const itemExists = await ItemModel.findById(id);
        if (!itemExists) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update item
        const updatedItem = await ItemModel.findByIdAndUpdate(
            id,
            { name, category, supplier, quantity, price },
            { new: true, runValidators: true }
        ).populate('category supplier');

        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update item', details: err });
    }
};

// Delete an item
export const deleteItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Check if item exists
        const itemExists = await ItemModel.findById(id);
        if (!itemExists) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete item
        await ItemModel.findByIdAndDelete(id);

        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete item', details: err });
    }
};
