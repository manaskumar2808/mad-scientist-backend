import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';

const Router = express.Router();

Router.get('/api/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
    
        if (!user) {
            throw new Error('User not found!');
        }
    
        res.status(200).send({
            message: 'user fetched successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserShowRouter };