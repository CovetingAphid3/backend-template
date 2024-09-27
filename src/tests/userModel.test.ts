import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserModel from '../models/userModel';

let mongoServer: MongoMemoryServer;

describe('UserModel', () => {
    // Setup MongoDB Memory Server before running tests
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri );
    });

    // Clean up and stop MongoDB server after all tests
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    // Clear database between tests to avoid side effects
    afterEach(async () => {
        const collections = await mongoose.connection.db?.collections();
        for (let collection of collections as any) {
            await collection.deleteMany({});
        }
    });

    test('should create a user with the correct schema', async () => {
        const user = new UserModel({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com',
            role: 'admin',
        });

        const savedUser = await user.save();

        expect(savedUser.username).toBe('testuser');
        expect(savedUser.email).toBe('test@example.com');
        expect(savedUser.role).toBe('admin');
        // Still no plaintext password check
    });

    test('should not create a user with a duplicate email', async () => {
        const user1 = new UserModel({
            username: 'testuser1',
            password: 'password123',
            email: 'test@example.com',
            role: 'manager',
        });

        const user2 = new UserModel({
            username: 'testuser2',
            password: 'password123',
            email: 'test@example.com',
            role: 'operator',
        });

        await user1.save();

        // Expect the second save to throw an error due to duplicate email
        await expect(user2.save()).rejects.toThrowError();
    });
});

