import express from "express";
import { literal, Op } from "sequelize";
import { Balance } from "../Models/Balance";
import { Movement } from "../Models/Movement";
import { User } from "../Models/User";

/**
 * BalanceService
 */
class BalanceService {
    /**
     * getBalanceByUserId
     *
     * @param req
     * @param res
     * @param next
     */
    public async getBalanceByUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            await Balance.findOne( { where: { userId: { [Op.eq]: req.params.userId } } } )
            .then((data) => res.status(200).json(data))
            .catch(next);
        } catch (error) {
            next(error);
        }
    }

    /**
     * add
     *
     * @param req
     * @param res
     * @param next
     */
    public async add(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            /**
             *
             */
            await Balance.update(
                {balance: literal(" balance::money + " + req.body.amount + "::money ")},
                { where: { userId: { [Op.eq]: req.body.userId } } }
            )
            .catch(next);
            /**
             *
             */
            const movement = {
                userId: req.body.userId,
                movementType: "ADD",
                amount: req.body.amount
            };
            await Movement.create(movement)
            .catch(next);
            /**
             *
             */
            await Balance.findOne( { where: { userId: { [Op.eq]: req.body.userId } } } )
            .then((data) => {
                res.json(data);
            }).catch(next);
        } catch (error) {
            next(error);
        }
    }

    /**
     * withdraw
     *
     * @param req
     * @param res
     * @param next
     */
    public async withdraw(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            /**
             *
             */
            await Balance.update(
                {balance: literal(" balance::money - " + req.body.amount + "::money ")},
                {where: {
                    [Op.and]: [
                        { userId: req.body.userId },
                        literal(" balance::money >= " + req.body.amount + "::money ")
                    ]
                }}
            ).then((data) => {
                if (data[0] === 0) {
                    res.status(400).send({
                        message: "The amount exceeds the balance"
                    });
                }
            }).catch(next);
            /**
             *
             */
            const movement = {
                userId: req.body.userId,
                movementType: "WITHDRAW",
                amount: req.body.amount
            };
            await Movement.create(movement)
            .catch(next);
            /**
             *
             */
            await Balance.findOne( { where: { userId: { [Op.eq]: req.body.userId } } } )
            .then((data) => {
                res.json(data);
            }).catch(next);
        } catch (error) {
            next(error);
        }
    }

    /**
     * transfer
     *
     * @param req
     * @param res
     * @param next
     */
    public async transfer(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            /**
             *
             */
            let userToTransfer: number = 0;
            await User.findOne({where: {[Op.and]: [{rut: req.body.rut }, literal(" id <> " + req.body.userId)]}
            }).then((data) => {
                if (data === null) {
                    res.status(400).send({
                        message: "USER_NOT_EXIST"
                    });
                } else {
                    userToTransfer = data.id;
                }
            }).catch(next);

            /**
             * withdraw money
             */
            await Balance.update(
                {balance: literal(" balance::money - " + req.body.amount + "::money ")},
                {where: {
                    [Op.and]: [
                        { userId: req.body.userId },
                        literal(" balance::money >= " + req.body.amount + "::money ")
                    ]
                }}
            ).then((data) => {
                if (data[0] === 0) {
                    res.status(400).send({
                        message: "THE_AMOUNT_EXCEEDS_THE_BALANCE"
                    });
                }
            }).catch(next);

            /**
             * pass money
             */
            await Balance.update(
                {balance: literal(" balance::money + " + req.body.amount + "::money ")},
                {where: { userId: userToTransfer } }
            ).catch(next);

            /**
             * movements
             */
            const movementWithdraw = {
                transferredFromUserId: req.body.userId,
                transferredToUserId: userToTransfer,
                movementType: "TRANSFERRED_TO",
                amount: req.body.amount,
            };
            await Movement.create(movementWithdraw)

            .catch(next);
            const movementAdd = {
                transferredFromUserId: userToTransfer,
                transferredToUserId: req.body.userId,
                movementType: "TRANSFER_FROM",
                amount: req.body.amount
            };
            await Movement.create(movementAdd)
            .catch(next);

            /**
             * return
             */
            await Balance.findOne( { where: { userId: { [Op.eq]: req.body.userId } } } )
            .then((data) => {
                res.status(200).json(data);
            }).catch(next);
        } catch (error) {
            next(error);
        }
    }
}
export const balanceService = new BalanceService();
