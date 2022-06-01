import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { json } from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';

const app = express();

import { PostCreateRouter } from './src/routes/post/create';
import { PostIndexRouter } from './src/routes/post';
import { PostDeleteRouter } from './src/routes/post/delete';
import { PostShowRouter } from './src/routes/post/show';

import { UserCreateRouter } from './src/routes/user/create';
import { UserDeleteRouter } from './src/routes/user/delete';
import { UserIndexRouter } from './src/routes/user';
import { UserShowRouter } from './src/routes/user/show';

import { ReportCreateRouter } from './src/routes/report/create';
import { ReportIndexRouter } from './src/routes/report';
import { ReportDeleteRouter } from './src/routes/report/delete';
import { ReportShowRouter } from './src/routes/report/show';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({storage: storage, fileFilter: fileFilter}).any());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.set('trust proxy', true);

app.use(json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(PostCreateRouter);
app.use(PostIndexRouter);
app.use(PostDeleteRouter);
app.use(PostShowRouter);

app.use(UserCreateRouter);
app.use(UserDeleteRouter);
app.use(UserIndexRouter);
app.use(UserShowRouter);

app.use(ReportCreateRouter);
app.use(ReportIndexRouter);
app.use(ReportDeleteRouter);
app.use(ReportShowRouter);

app.all('*', (req: Request, res: Response) => {
    console.log(req.path);
    throw new Error('API route not found!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong!');
    if (err) {
        console.log(err.message);
        return res.status(400).send({
            message: err.message,
        });
    }

    res.status(400).send({
        message: 'Something went wrong!',
    });
});

export { app };