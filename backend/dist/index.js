import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//For env File 
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
app.get('/test', (req, res) => {
    res.json("Selam test data :D :) :=)");
});
try {
    mongoose.connect(process.env.DB_CONNECTION_URL)
        .then((res) => console.log('Connected to DB'))
        .catch((err) => console.log('err => ', err));
}
catch (error) {
    console.log('error => ', error);
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
