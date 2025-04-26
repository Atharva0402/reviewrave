
import express from 'express';
import usersRoutes from './routes/users.js';
import storesRoutes from './routes/stores.js';
import ratingsRoutes from './routes/ratings.js';
import authRoutes from './routes/auth.js'
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  




app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/stores', storesRoutes);
app.use('/api/ratings', ratingsRoutes);

export default app;
