import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            index: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        password: {
            type: String,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        qualification: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isGeneralManager: {
            type: Boolean,
            default: false
        },
        isManager: {
            type: Boolean,
            default: false
        },
        isEmployee: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;