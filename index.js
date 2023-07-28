import dotenv from "dotenv";
import express, { urlencoded } from "express";
import apiRouter from "./routes/api.js";
import connection from "./connection.js";
import cors from 'cors';

const env = dotenv.config().parsed;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'http://localhost:9000'}));

app.use("/", apiRouter);

app.use((req, res) => {
    res.status(404).json({ message: "404_NOT_FOUND" });
});

connection();

app.listen(`${env.APP_PORT}`, () => {
    console.log(`listen port ${env.APP_PORT}`);
})