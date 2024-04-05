import LeadsModel from "../Models/Leads.js";
import csv from 'csvtojson';
import xlsx from 'xlsx'; // or import exceljs from 'exceljs';

export const uploadLeads = async (req, res) => {
    try {
        // Convert Excel file to CSV format
        const workbook = xlsx.readFile(req.file.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const csvData = xlsx.utils.sheet_to_csv(worksheet);

        // Parse CSV data to JSON using csvtojson
        csv().fromString(csvData).then(async (response) => {
            const filteredData = response.map(obj => {
                if (obj.Name.trim() !== '' || obj.Phone.trim() !== '') {
                    return {
                        name: obj.Name.trim(),
                        email: obj.Email.trim(),
                        phone: obj.Phone.trim(),
                        source: obj.Source.trim()
                    };
                }
                return null;
            }).filter(obj => obj !== null);
            await LeadsModel.insertMany(filteredData);
        });

        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

export const getLeads = async (req, res) => {
    try {
        let query = {};

        switch (req.query.type) {
            case 'all':
                break;
            case 'unassigned':
                query.isAssigned = false;
                break;
            case 'assigned':
                query.isAssigned = true;
                break;
            default:
                return res.status(400).json({ message: 'Invalid type parameter' });
        }

        const leads = await LeadsModel.find(query);
        res.status(200).json(leads);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
