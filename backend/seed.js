import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

const MONGO_URI = 'mongodb://localhost:27017/tailoring';

const seedAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding');

        const adminEmail = 'thangamwrites@gmail.com';
        const adminPassword = 'Thangama@547';

        // Delete any existing admin to be sure
        await User.deleteMany({ role: 'admin' });
        await User.deleteMany({ email: adminEmail });

        const adminUser = new User({
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log(`Admin user created/updated: ${adminEmail}`);

        const verifiedUser = await User.findOne({ email: adminEmail });
        console.log('Verification check:', verifiedUser ? 'Found' : 'Not Found');
        if (verifiedUser) {
            console.log('Role:', verifiedUser.role);
        }

        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedAdmin();
