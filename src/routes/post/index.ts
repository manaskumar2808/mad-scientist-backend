import Express, { Request, Response, NextFunction } from 'express';
import { Post } from '../../models/post';

const Router = Express.Router();

Router.get('/api/post', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.find().populate('creator');
        res.status(200).send({
            message: 'Posts fetched successfully!',
            posts,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as PostIndexRouter };