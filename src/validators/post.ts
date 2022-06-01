import { body } from 'express-validator';

const validator = [
    body('title')
        .isLength({ min: 2 }).withMessage('Title should be atleast 2 characters long.'),
    body('creator')
        .notEmpty().withMessage('Creator is necessary!'),
];

export { validator as PostValidator };