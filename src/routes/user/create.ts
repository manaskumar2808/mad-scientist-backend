import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { UserValidator } from '../../validators/user';

const Router = express.Router();

Router.post('/api/user', UserValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, userName, image } = req.body;

        const user = User.build({
            email, userName, image,
        });

        await user.save();

        res.status(201).send({
            message: 'User created successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserCreateRouter };