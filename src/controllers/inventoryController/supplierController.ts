// controllers/supplierController.ts
import { Request, Response } from 'express';
import SupplierModel from '../../models/inventoryModels/supplierModel';

// Create a new supplier
export const createSupplier = async (req: Request, res: Response) => {
    try {
        const { name, contactInfo, address } = req.body;

        const newSupplier = new SupplierModel({ name, contactInfo, address });
        await newSupplier.save();

        res.status(201).json(newSupplier);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create supplier', details: err });
    }
};

// Get all suppliers
export const getAllSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliers = await SupplierModel.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch suppliers', details: err });
    }
};

// Get a supplier by ID
export const getSupplierById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const supplier = await SupplierModel.findById(id);
        
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch supplier', details: err });
    }
};

// Update a supplier
export const updateSupplier = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, contactInfo, address } = req.body;

        const updatedSupplier = await SupplierModel.findByIdAndUpdate(
            id,
            { name, contactInfo, address },
            { new: true, runValidators: true }
        );

        res.json(updatedSupplier);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update supplier', details: err });
    }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const supplier = await SupplierModel.findByIdAndDelete(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.json({ message: 'Supplier deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete supplier', details: err });
    }
};

