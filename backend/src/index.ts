import express from 'express';
import dotenv from 'dotenv';
import { pgDataSource } from './database/pg-datasource.config';
import { UserRouter } from './routes/user.router';
import cors from "cors"

dotenv.config();

pgDataSource.initialize();

const app = express();
const port = process.env.API_PORT

app.use(express.json());

app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'http://frontend:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

const userRouter = new UserRouter();

app.use('/users', userRouter.initializeRoutes());

app.listen(port, () => console.log(`http://localhost:${port}`));