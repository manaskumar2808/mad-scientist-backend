"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('userName')
        .isLength({ min: 2, max: 20 }).withMessage('Username should be between length 2 and 20!'),
];
exports.UserValidator = validator;
