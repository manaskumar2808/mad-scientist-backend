import Express, { Request, Response, NextFunction } from 'express';
import { Report } from '../../models/report';

const Router = Express.Router();

Router.get('/api/report/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const report = await Report.findById(id).populate('post');

        res.status(200).send({
            message: 'Report fetched successfully!',
            report,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportShowRouter };