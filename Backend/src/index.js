import express from 'express' ;
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from 'cors';
import path from 'path';
import { ConnectDB } from './lib/db.js';
import errorHandler from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.route.js';
import goalRoutes from './routes/goal.route.js';
import communityRoutes from './routes/community.route.js';
import resumeRoutes from './routes/resume.route.js'

const app = express() ;

dotenv.config();

// Force port to 5000
const PORT = 5000;
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb" , extended:true}));

app.use(cookieParser());

app.use("/api/auth" , authRoutes) ;
app.use("/api/goal" , goalRoutes) ;
app.use("/api/community", communityRoutes);
app.use("/api/resume", resumeRoutes);

app.use(errorHandler);

app.listen(PORT , () => {
    console.log("Server is running on PORT:" +PORT);
    ConnectDB();
});