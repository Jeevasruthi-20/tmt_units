import mongoose from 'mongoose';

const classEnrollmentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['online', 'offline'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    classType: {
        type: String,
        required: true,
    },
    // Online specific fields
    preferredDate: {
        type: String,
    },
    preferredTime: {
        type: String,
    },
    // Offline specific fields
    address: {
        type: String,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

export default mongoose.model('ClassEnrollment', classEnrollmentSchema);
