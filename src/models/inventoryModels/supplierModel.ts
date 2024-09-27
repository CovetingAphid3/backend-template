// models/SupplierModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ISupplier extends Document {
    name: string;
    contactInfo: {
        email: string;
        phone: string;
    };
    address?: string; // Optional field for the supplier's address
    createdAt: Date;
}

const supplierSchema: Schema = new Schema({
    name: { type: String, required: true }, // Supplier name is required
    contactInfo: {
        email: { type: String, required: true }, // Email is required
        phone: { type: String, required: true }, // Phone is required
    },
    address: { type: String }, // Optional address
    createdAt: { type: Date, default: Date.now }, // Automatically set the created date
});

const SupplierModel = mongoose.model<ISupplier>('Supplier', supplierSchema);

export default SupplierModel;

