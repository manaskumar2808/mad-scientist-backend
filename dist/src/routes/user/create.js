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
exports.UserCreateRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../models/user");
const user_2 = require("../../validators/user");
const Router = express_1.default.Router();
exports.UserCreateRouter = Router;
Router.post('/api/user', user_2.UserValidator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, image } = req.body;
        const user = user_1.User.build({
            email, userName, image,
        });
        yield user.save();
        res.status(201).send({
            message: 'User created successfully',
            user,
        });
    }
    catch (err) {
        next(err);
    }
}));
