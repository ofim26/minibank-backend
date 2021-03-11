import express from "express";
import { Op } from "sequelize";
import { Balance } from "../Models/Balance";
import { balanceRepository } from "../Repositories/BalanceRepository";

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
            balanceRepository.addMoney(req.body.amount, req.body.userId);
            balanceRepository.createMovemnet(req.body.userId, null, "ADD", req.body.amount);
            balanceRepository.getBalanceUser(req.body.userId).then((data: any) => {
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
            balanceRepository.whitdrawMoney(req.body.amount, req.body.userId).then((resp1: any) => {
                if (resp1[0] === 0) {
                    res.status(400).send({message: "THE_AMOUNT_EXCEEDS_THE_BALANCE"});
                } else {
                    balanceRepository.createMovemnet(req.body.userId, null, "WITHDRAW", req.body.amount);
                    balanceRepository.getBalanceUser(req.body.userId).then((data: any) => {
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
            balanceRepository.userToTransferExist(req.body.rut, req.body.userId).then((resp: any) => {
                if (resp === null) {
                    res.status(400).send({message: "USER_NOT_EXIST"});
                } else {
                    userToTransfer = resp.dataValues.id;
                    balanceRepository.whitdrawMoney(req.body.amount, req.body.userId).then((resp1: any) => {
                        if (resp1[0] === 0) {
                            res.status(400).send({message: "THE_AMOUNT_EXCEEDS_THE_BALANCE"});
                        } else {
                            balanceRepository.transferMoney(req.body.amount, userToTransfer);
                            balanceRepository.createMovemnet(
                                req.body.userId, userToTransfer,
                                "TRANSFERRED_TO", req.body.amount
                            );
                            balanceRepository.createMovemnet(
                                userToTransfer,
                                req.body.userId,
                                "TRANSFERRED_FROM",
                                req.body.amount
                            );
                            balanceRepository.getBalanceUser(req.body.userId).then((data: any) => {
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
}
export const balanceService = new BalanceService();
