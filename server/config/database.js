import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const dbConnect =  async () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log(`DB Connected Successfully`))
    .catch((err) => {
        console.log("ERROR in DB connection:",err);
    })
}

export default dbConnect;