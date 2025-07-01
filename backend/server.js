
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './Routers/userRouter.js';


const app = express();
app.use(express.json());

const FRONTEND_ORIGIN = 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));



app.use('/api/auth', userRoutes);


const PORT = process.env.PORT || 5000; // eslint-disable-line no-undef

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)  // eslint-disable-line no-undef
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
