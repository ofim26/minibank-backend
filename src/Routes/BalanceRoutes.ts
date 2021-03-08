import express, { Router } from "express";
import { balanceService } from "../Services/BalanceService";

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: Balance
 */
class BalanceRoutes {
    public router: Router = express.Router();

    /**
     * getBalance
     */
    public getBalanceByUserId(): Router {
        /**
         * @swagger
         * path:
         *  /balance/{userId}:
         *    get:
         *      summary: Get Balance
         *      tags: [Balance]
         *      parameters:
         *        - in: path
         *          name: userId
         *          schema:
         *            type: integer
         *          required: true
         *          description: User ID
         *      responses:
         *        "200":
         *          description: Balance Model
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Balance'
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
        this.router.get("/:userId", balanceService.getBalanceByUserId);
        return this.router;
    }

    /**
     * create
     */
    public add(): Router {
        /**
         * @swagger
         * path:
         *  /balance/add:
         *    put:
         *      summary: Add amount
         *      tags: [Balance]
         *      consumes:
         *        - application/json
         *      requestBody:
         *        description: Iterface balance add amount
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/IBalanceRequest'
         *      responses:
         *        "200":
         *          description: New balance
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Balance'
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
        this.router.put("/add", balanceService.add);
        return this.router;
    }

    /**
     * create
     */
    public withdraw(): Router {
        /**
         * @swagger
         * path:
         *  /balance/withdraw:
         *    put:
         *      summary: Withdraw money
         *      tags: [Balance]
         *      consumes:
         *        - application/json
         *      requestBody:
         *        description: Withdraw money
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/IBalanceRequest'
         *      responses:
         *        "200":
         *          description: New balance
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Balance'
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
        this.router.put("/withdraw", balanceService.withdraw);
        return this.router;
    }

    /**
     * transfer
     */
    public transfer(): Router {
        /**
         * @swagger
         * path:
         *  /balance/transfer:
         *    put:
         *      summary: Transfer money
         *      tags: [Balance]
         *      consumes:
         *        - application/json
         *      requestBody:
         *        description: Transfer money
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/IBalanceTransferRequest'
         *      responses:
         *        "200":
         *          description: New balance
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Balance'
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
        this.router.put("/transfer", balanceService.transfer);
        return this.router;
    }
}
export const balanceRoutes = new BalanceRoutes();
