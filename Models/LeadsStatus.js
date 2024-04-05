import mongoose from 'mongoose';

const LeadsStatusSchema = new mongoose.Schema(
    {
        EmployeeID: {
            type: mongoose.Types.ObjectId,
        },
        leadID: {
            type: mongoose.Types.ObjectId,
        }
    },
    {
        timestamps: true,
    }
);

const LeadsStatus = mongoose.model('LeadStatus', LeadsStatusSchema);
export default LeadsStatus;