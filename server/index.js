import express from 'express'
import dbConnect from './config/database.js'
import userRoutes from './route/user.route.js'
import authRoutes from './route/auth.route.js'
import cookieParser from 'cookie-parser'
import postRoutes from './route/post.route.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

const port=3000;

app.listen(port,() => {
    console.log(`Server is Running on the server ${port}`);
})

dbConnect();

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statutsCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})