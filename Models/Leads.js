import mongoose from 'mongoose';

const LeadsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default: ''
        },
        source: {
            type: String,
            default: ''
        },
        phone: {
            type: Number,
            default: ''
        },
    },
    {
        timestamps: true,
    }
);

const LeadsModel = mongoose.model('Leads', LeadsSchema);

export default LeadsModel;