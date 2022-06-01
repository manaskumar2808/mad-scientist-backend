import Express, { Request, Response, NextFunction } from 'express';
import { Report } from '../../models/report';

const Router = Express.Router();

Router.get('/api/report', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reports = await Report.find().populate('post');

        res.status(200).send({
            message: 'Reports fetched successfully!',
            reports,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportIndexRouter };