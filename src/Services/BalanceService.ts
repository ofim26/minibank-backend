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
    public add = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            this.addMoney(req.body.amount, req.body.userId);
            this.createMovemnet(req.body.userId, null, "ADD", req.body.amount);
            this.getBalanceUser(req.body.userId).then((data: any) => {
                res.status(200).json(data);
            });
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
    public withdraw = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            this.whitdrawMoney(req.body.amount, req.body.userId).then((resp1: any) => {
                if (resp1[0] === 0) {
                    res.status(400).send({message: "THE_AMOUNT_EXCEEDS_THE_BALANCE"});
                } else {
                    this.createMovemnet(req.body.userId, null, "WITHDRAW", req.body.amount);
                    this.getBalanceUser(req.body.userId).then((data: any) => {
                        res.status(200).json(data);
                    });
                }
            });
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
    public transfer = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            let userToTransfer: number = 0;
            this.userToTransferExist(req.body.rut, req.body.userId).then((resp: any) => {
                if (resp === null) {
                    res.status(400).send({message: "USER_NOT_EXIST"});
                } else {
                    userToTransfer = resp.dataValues.id;
                    this.whitdrawMoney(req.body.amount, req.body.userId).then((resp1: any) => {
                        if (resp1[0] === 0) {
                            res.status(400).send({message: "THE_AMOUNT_EXCEEDS_THE_BALANCE"});
                        } else {
                            this.transferMoney(req.body.amount, userToTransfer);
                            this.createMovemnet(req.body.userId, userToTransfer, "TRANSFERRED_TO", req.body.amount);
                            this.createMovemnet(userToTransfer, req.body.userId, "TRANSFERRED_FROM", req.body.amount);
                            this.getBalanceUser(req.body.userId).then((data: any) => {
                                res.status(200).json(data);
                            });
                        }
                    });
                }
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * userExist
     * @param rut
     * @param userId
     * @returns
     */
    public userToTransferExist(rut: string, userId: number): Promise<any> {
        return User.findOne({where: {[Op.and]: [{rut }, literal(" id <> " + userId)]}});
    }

    /**
     * whitdrawMoney
     * @param amount
     * @param userId
     */
    public whitdrawMoney(amount: number, userId: number): Promise<any> {
        return Balance.update(
            {balance: literal(" balance::money - " + amount + "::money ")},
            {where: {
                [Op.and]: [
                    { userId },
                    literal(" balance::money >= " + amount + "::money ")
                ]
            }}
        );
    }

    /**
     * addMoney
     * @param amount
     * @param userId
     */
    private addMoney(amount: number, userId: number): Promise<any> {
        return Balance.update(
            {balance: literal(" balance::money + " + amount + "::money ")},
            { where: { userId: { [Op.eq]: userId } } }
        );
    }

    /**
     * addBalance
     * @param amount
     * @param userId
     */
    private transferMoney(amount: number, userId: number): Promise<any> {
    return Balance.update(
        {balance: literal(" balance::money + " + amount + "::money ")},
        {where: { userId } }
    );
        }

    /**
     * createMovemnet
     * @param type
     * @param transferredFromUserId
     * @param transferredToUserId
     */
    private createMovemnet(transferredFromUserId: number,
                           transferredToUserId: number, type: string, amount: number): Promise<any>  {
        const movementWithdraw = {
            transferredFromUserId,
            transferredToUserId,
            movementType: type,
            amount,
        };
        return Movement.create(movementWithdraw);
    }

    /**
     *
     * @param userId
     * @param res
     */
    private getBalanceUser(userId: number): Promise<any> {
        return Balance.findOne( { where: { userId: { [Op.eq]: userId }}});
    }
}
export const balanceService = new BalanceService();
