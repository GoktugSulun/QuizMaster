import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
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
    res.json("Selam bebek ben dataaaaa :D");
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
