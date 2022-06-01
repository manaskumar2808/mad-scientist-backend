"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('title')
        .isLength({ min: 2 }).withMessage('Title should be atleast 2 characters long.'),
    (0, express_validator_1.body)('creator')
        .notEmpty().withMessage('Creator is necessary!'),
];
exports.PostValidator = validator;
