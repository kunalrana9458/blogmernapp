import express from 'express'
import dbConnect from './config/database.js'
import userRoutes from './route/user.route.js'
import authRoutes from './route/auth.route.js'
import cookieParser from 'cookie-parser'
import postRoutes from './route/post.route.js'
import commentRoutes from './route/comment.route.js'
import path from 'path'

const app = express();

app.use(express.json());
app.use(cookieParser());

 const __dirname = path.resolve();

const port=3000;

app.listen(port,() => {
    console.log(`Server is Running on the server ${port}`);
})

dbConnect();

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes)
app.use('/api/comment',commentRoutes)

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

app.use(express.static(path.join(__dirname,'/client/dist')))

app.use((err,req,res,next)=>{
    const statusCode = err.statutsCode || 500;
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})