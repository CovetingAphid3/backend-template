// models/CategoryModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
    description?: string;
}

const categorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String }
});

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);

export default CategoryModel;

