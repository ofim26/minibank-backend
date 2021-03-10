import express, { Router } from "express";
import { movementsService } from "../Services/MovementsService";

/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: Movements
 */
class MovementsRoutes {
    public router: Router = express.Router();

    /**
     * getBalance
     */
    public findAllByUserId(): Router {
        /**
         * @swagger
         * path:
         *  /movements:
         *    post:
         *      summary: Get All Movement
         *      tags: [Movements]
         *      consumes:
         *        - application/json
         *      requestBody:
         *        description: IUser Authenticate
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/IMovementsRequest'
         *      responses:
         *        "200":
         *          description: Movement Model
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Movement'
         *        "400":
         *          description: Bad Request
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Error'
         *        "500":
         *          description: Internal Server Error
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Error'
         */
        this.router.post("/", movementsService.findAllByUserId);
        return this.router;
    }
}
export const movementsRoutes = new MovementsRoutes();
