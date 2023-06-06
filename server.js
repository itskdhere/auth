import cors from 'cors';
import chalk from 'chalk';
import multer from 'multer';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import signup from './routes/auth/signup.js';
import signin from './routes/auth/signin.js';
import signout from './routes/auth/signout.js';
import getUser from './routes/api/getUser.js';
import updateUser from './routes/api/updateUser.js';
import deleteUser from './routes/api/deleteUser.js';

dotenv.config();

const port = process.env.PORT || 5000;

const corsOptions = {
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200
};

const useCors = cors(corsOptions);
const jsonParser = bodyParser.json();
const upload = multer();

const server = express();

server.use(express.static('public'));

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/auth/signup', upload.none(), signup);

server.post('/auth/signin', upload.none(), signin);

server.post('/auth/signout', jsonParser, signout);

server.get('/api/user', jsonParser, getUser);

server.put('/api/user', jsonParser, updateUser);

server.delete('/api/user', jsonParser, deleteUser);

server.listen(port, () => {
    console.log(`${chalk.greenBright('WebServer Listening On Port')} ${chalk.greenBright.bold(port)}\n${chalk.magentaBright('Visit:')} ${chalk.blue('http://localhost:' + port)}`);
});