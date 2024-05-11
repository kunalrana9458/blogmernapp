import express from 'express'
import dbConnect from './config/database.js'
import userRoutes from './route/user.route.js'
import authRoutes from './route/auth.route.js'

const app = express();

app.use(express.json());

const port=3000;

app.listen(port,() => {
    console.log(`Server is Running on the server ${port}`);
})

dbConnect();

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);