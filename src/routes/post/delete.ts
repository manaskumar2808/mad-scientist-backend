import Express, { Request, Response, NextFunction } from 'express';
import { Post } from '../../models/post';

const Router = Express.Router();

Router.delete('/api/post/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await Post.findByIdAndDelete(id);
        res.status(202).send({
            message: 'Post deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
});

export { Router as PostDeleteRouter };