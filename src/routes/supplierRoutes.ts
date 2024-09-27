// routes/supplierRoutes.ts
import { Router } from 'express';
import {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} from '../controllers/inventoryController/supplierController';

const router = Router();

router.post('/suppliers', createSupplier);       // Create a new supplier
router.get('/suppliers', getAllSuppliers);       // Fetch all suppliers
router.get('/suppliers/:id', getSupplierById);   // Fetch a single supplier by ID
router.put('/suppliers/:id', updateSupplier);    // Update a supplier by ID
router.delete('/suppliers/:id', deleteSupplier); // Delete a supplier by ID

export default router;

