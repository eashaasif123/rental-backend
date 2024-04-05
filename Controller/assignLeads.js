import LeadsModel from "../Models/Leads.js";
import LeadsStatus from './../Models/LeadsStatus.js';

export const assignLead = async (req, res) => {
    try {
        const leads = req.body.leads;
        for(const item of leads){
            const lead = await LeadsModel.findById(item.id);
            lead.isAssigned = true;
            const details = lead.leadStatus || [];
            details.push({
                message: 'Lead assigned successfully',
                date: new Date()
            })
            lead.leadStatus = details;
            await lead.save();
            await LeadsStatus.deleteMany({ leadID: item.id });
            new LeadsStatus({
                leadID: item.id,
                EmployeeID: req.body.EmployeeID
            })
        }
        res.status(200).json({ message: 'Lead assigned successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

export const getAssignedLeads = async (req, res) => {
    try {
        const { customerId } = req.params;
        const customer = await CustomersModel.findById(customerId).populate('assignedLeads');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer.assignedLeads);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

export const getLeadById = async (req, res) => {
    try {
        const { leadId } = req.params;

        const lead = await LeadsModel.findById(leadId);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.status(200).json(lead);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};