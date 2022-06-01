import Express, { Request, Response, NextFunction } from 'express';
import { Report } from '../../models/report';

const Router = Express.Router();

Router.delete('/api/report/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await Report.findByIdAndDelete(id);
        res.status(202).send({
            message: 'Report deleted successfully!',
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ReportDeleteRouter };