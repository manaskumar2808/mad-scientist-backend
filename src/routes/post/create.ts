import Express, { Request, Response, NextFunction } from 'express';
import { Post } from '../../models/post';
import { PostValidator } from '../../validators/post';

const Router = Express.Router();

Router.post('/api/post', PostValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, gallery, creator } = req.body;

        const post = Post.build({
            title, description, gallery, creator,
        });

        await post.save();

        res.status(201).send({
            message: 'Post created successfully!',
            post,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as PostCreateRouter };