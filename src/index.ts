import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/index';


dotenv.config({path: "./config.env"});

const MONGO_URL = process.env.MONGODB_URI;
const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8000, () => {
    console.log("Server is running on port 8000.");
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL) ;
mongoose.connection.on('error', (error:Error) => {
    console.log(error);
});
app.use("/", router());
