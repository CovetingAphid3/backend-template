import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import TicketModel from '../models/Tickets';

let mongoServer: MongoMemoryServer;

describe('TicketModel', () => {
    // Setup an in-memory MongoDB server before running tests
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri );
    });

    // Disconnect and stop the in-memory server after all tests
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    // Clear the database between tests to avoid cross-test side effects
    afterEach(async () => {
        const collections = await mongoose.connection.db?.collections();
        for (let collection of collections as any) {
            await collection.deleteMany({});
        }
    });

    test('should create a ticket with the correct schema', async () => {
        const ticket = new TicketModel({
            title: "Test Ticket",
            description: "This is a test ticket description",
            userId: new mongoose.Types.ObjectId(), // Mock userId for testing
            status: 'open', // Optional, defaults to 'open'
            priority: 'medium', // Optional, defaults to 'medium'
            assignedTo: new mongoose.Types.ObjectId(), // Mock userId for assigned user
            comments: [
                {
                    userId: new mongoose.Types.ObjectId(),
                    comment: "Test comment",
                    timestamp: new Date(),
                },
            ],
        });

        const savedTicket = await ticket.save();

        expect(savedTicket._id).toBeDefined();
        expect(savedTicket.title).toBe("Test Ticket");
        expect(savedTicket.description).toBe("This is a test ticket description");
        expect(savedTicket.userId).toBeDefined();
        expect(savedTicket.status).toBe("open");
        expect(savedTicket.priority).toBe("medium");
    });
});

