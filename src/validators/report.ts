import { body } from 'express-validator';

const validator = [
    body('reason')
        .notEmpty().withMessage('Reason should not be empty.'),
    body('post')
        .notEmpty().withMessage('Post is necessary!'),
];

export { validator as ReportValidator };