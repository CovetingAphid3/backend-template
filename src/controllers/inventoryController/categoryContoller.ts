// controllers/categoryController.ts
import { Request, Response } from 'express';
import CategoryModel from '../../models/inventoryModels/categoryModel'

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    try {
        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const newCategory = new CategoryModel({ name, description });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

