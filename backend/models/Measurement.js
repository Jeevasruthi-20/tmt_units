import mongoose from 'mongoose';

const measurementSchema = new mongoose.Schema({
    garmentType: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    measurements: {
        type: Object,
        required: true,
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

export default mongoose.model('Measurement', measurementSchema);
