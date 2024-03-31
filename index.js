import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv';
import connectDB from './config/dbConnection.js';
import RegisterationRoutes from './Routes/Registerationroutes.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());
config();


app.use('/register', RegisterationRoutes)
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server Connected'
    })
})
const PORT = process.env.PORT || 3001;

(async () => {
    connectDB().then(()=>app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
})()
