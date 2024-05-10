import express from 'express'
import dbConnect from './config/database.js'



const app = express();

const port=3000;

app.listen(port,() => {
    console.log(`Server is Running on the server ${port}`);
})

dbConnect();