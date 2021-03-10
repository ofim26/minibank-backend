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
            await Movement.findAndCountAll({
                where: { transferredFromUserId: req.params.userId },
                order: [["createdAt", "DESC"]],
                limit: 5,
                offset: 0,
            })
            .then((data) => res.status(200).json(data))
            .catch(next);
        } catch (error) {
            next(error);
        }
    }
}
export const movementsService = new MovementsService();
