"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = [
    (0, express_validator_1.body)('reason')
        .notEmpty().withMessage('Reason should not be empty.'),
    (0, express_validator_1.body)('post')
        .notEmpty().withMessage('Post is necessary!'),
];
exports.ReportValidator = validator;
