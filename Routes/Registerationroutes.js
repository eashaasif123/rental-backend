import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer'
import Registration from '../Models/RegisterationModel.js';
import { SendEmail } from '../utils/SendEmail.js';

const RegisterationRoutes = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file)
        const fileName = uuidv4() + '-' + file.originalname; // Generate a unique filename
        cb(null, fileName);
    },
});


const upload = multer({ storage });
RegisterationRoutes.post('/', upload.single('file'), async (req, res) => {
    try {
        // Create a new registration instance
        const password = Math.random().toString(36).slice(-8);
        const userId = 'STS'+Math.floor(Math.random()*10000 + 1000)
        const registration = new Registration({
            userId: userId,
            password: password,
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            qualification: req.body.qualification,
            address: req.body.address,
            file: req.file.filename, // Save the filename of the uploaded file
        });

        // Save the registration data to MongoDB
        await registration.save();
        SendEmail(req.body.email, req.body.name, userId, password);
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// RegisterationRoutes.route('/').get().post('');

export default RegisterationRoutes