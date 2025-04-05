import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoute.js"
import taskRoutes from "./routes/taskRoute.js"

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://mytimetable-app.vercel.app/',
    methods: ['GET', 'POST', 'PUT','DELETE'],
  }));
dotenv.config();


const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("DB connected successfully");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));


app.use('/api/users', userRoutes);
app.use('/api/timetable', taskRoutes);
