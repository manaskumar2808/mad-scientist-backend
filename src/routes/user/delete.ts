import express, { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';

const Router = express.Router();

Router.delete('/api/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
    
        if (!user) {
            throw new Error('No such user exists!');
        }
    
        await User.findByIdAndDelete(id);
    
        res.status(202).send({
            message: 'user deleted successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserDeleteRouter };