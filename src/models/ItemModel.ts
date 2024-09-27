// models/ItemModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IItem extends Document {
    name: string;
    category: string;
    supplier: string;
    quantity: string;
    price: number;
    createdAt: Date
}

const itemSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ItemModel = mongoose.model<IItem>('Item', itemSchema);

export default ItemModel
