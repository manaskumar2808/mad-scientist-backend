import Express, { Request, Response, NextFunction } from 'express';
import { Report } from '../../models/report';
import { ReportValidator } from '../../validators/report';

const Router = Express.Router();

Router.post('/api/report', ReportValidator, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reason, post } = req.body;

        const report = Report.build({
            reason, post,
        });

        await report.save();

        res.status(201).send({
            message: 'Report submitted successfully!',
            report,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportCreateRouter };