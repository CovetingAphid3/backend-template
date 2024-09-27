import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Ticket model
export interface ITicket extends Document {
    title: string;
    description: string;
    userId: mongoose.Types.ObjectId;
    status: 'open' | 'in progress' | 'closed';
    priority: 'low' | 'medium' | 'high';
    assignedTo?: mongoose.Types.ObjectId;
    comments?: Array<{
        userId: mongoose.Types.ObjectId;
        comment: string;
        timestamp: Date;
    }>;
    createdAt: Date;
    updatedAt: Date; // Optional if you're using mongoose timestamps
}

// Define the Ticket schema
const TicketSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'in progress', 'closed'],
        default: 'open',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false, // Make it explicitly optional
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true }); // Automatically manages `createdAt` and `updatedAt`

// Export the Ticket model as the default export
const TicketModel = mongoose.model<ITicket>('Ticket', TicketSchema);

export default TicketModel;

