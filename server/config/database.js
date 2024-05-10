import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const dbConnect =  async () => {
    mongoose.connect("mongodb+srv://kunalrana9458:upMdxaZmRgwxfXyA@cluster0.z9cpzqt.mongodb.net/BLOGMERNDB")
    .then(() => console.log(`DB Connected Successfully`))
    .catch((err) => {
        console.log("ERROR in DB connection:",err);
    })
}

export default dbConnect;