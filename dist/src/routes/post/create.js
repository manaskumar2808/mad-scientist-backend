"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreateRouter = void 0;
const express_1 = __importDefault(require("express"));
const post_1 = require("../../models/post");
const post_2 = require("../../validators/post");
const Router = express_1.default.Router();
exports.PostCreateRouter = Router;
Router.post('/api/post', post_2.PostValidator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, gallery, creator } = req.body;
        const post = post_1.Post.build({
            title, description, gallery, creator,
        });
        yield post.save();
        res.status(201).send({
            message: 'Post created successfully!',
            post,
        });
    }
    catch (err) {
        next(err);
    }
}));
