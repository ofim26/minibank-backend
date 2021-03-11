import express from "express";
import { Movement } from "../Models/Movement";

/**
 * MovementsService
 */
class MovementsService {
    /**
     * findAll
     *
     * @param req
     * @param res
     * @param next
     */
    public async findAllByUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const offset = req.body.currentPage === 0 ? 1 : req.body.currentPage * req.body.itemsPerPage;
            await Movement.findAndCountAll({
                where: { transferredFromUserId: req.body.userId },
                order: [["createdAt", "DESC"]],
                limit: req.body.itemsPerPage,
                offset,
            })
            .then((data) => res.status(200).json(data))
            .catch(next);
        } catch (error) {
            next(error);
        }
    }
}
export const movementsService = new MovementsService();
