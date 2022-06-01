import { body } from 'express-validator';

const validator = [
    body('email')
        .isEmail().withMessage('Invalid email address'),
    body('userName')
        .isLength({ min: 2, max: 20 }).withMessage('Username should be between length 2 and 20!'),
];

export { validator as UserValidator };