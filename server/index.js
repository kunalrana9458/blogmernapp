import express from 'express';
import dbConnect from './config/database.js';
import userRoutes from './route/user.route.js';
import authRoutes from './route/auth.route.js';
import cookieParser from 'cookie-parser';
import postRoutes from './route/post.route.js';
import commentRoutes from './route/comment.route.js';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Only add CORS if frontend and backend are on different subdomains
// Comment this out if frontend and backend are on the SAME domain
app.use(cors({
    origin: '*', // Allows requests from any origin
    credentials: true, // Only if you're using cookies or sessions
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is Running kkk on port ${port}`);
});

// Database connection
dbConnect();

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Catch-all route to serve React frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
