import Express, { Request, Response, NextFunction } from 'express';
import { Post } from '../../models/post';

const Router = Express.Router();

Router.get('/api/post/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate('creator');
        res.status(200).send({
            message: 'Post fetched successfully!',
            post,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as PostShowRouter };