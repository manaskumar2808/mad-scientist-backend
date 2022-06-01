"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
exports.app = app;
const create_1 = require("./src/routes/post/create");
const post_1 = require("./src/routes/post");
const delete_1 = require("./src/routes/post/delete");
const show_1 = require("./src/routes/post/show");
const create_2 = require("./src/routes/user/create");
const delete_2 = require("./src/routes/user/delete");
const user_1 = require("./src/routes/user");
const show_2 = require("./src/routes/user/show");
const create_3 = require("./src/routes/report/create");
const report_1 = require("./src/routes/report");
const delete_3 = require("./src/routes/report/delete");
const show_3 = require("./src/routes/report/show");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use((0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).any());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.set('trust proxy', true);
app.use((0, body_parser_1.json)());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(create_1.PostCreateRouter);
app.use(post_1.PostIndexRouter);
app.use(delete_1.PostDeleteRouter);
app.use(show_1.PostShowRouter);
app.use(create_2.UserCreateRouter);
app.use(delete_2.UserDeleteRouter);
app.use(user_1.UserIndexRouter);
app.use(show_2.UserShowRouter);
app.use(create_3.ReportCreateRouter);
app.use(report_1.ReportIndexRouter);
app.use(delete_3.ReportDeleteRouter);
app.use(show_3.ReportShowRouter);
app.all('*', (req, res) => {
    console.log(req.path);
    throw new Error('API route not found!');
});
app.use((err, req, res, next) => {
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
