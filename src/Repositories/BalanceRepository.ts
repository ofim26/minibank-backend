import { literal, Op } from "sequelize";
import { Balance } from "../Models/Balance";
import { Movement } from "../Models/Movement";
import { User } from "../Models/User";

/**
 * BalanceService
 */
class BalanceRepository {
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
     public addMoney(amount: number, userId: number): Promise<any> {
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
    public transferMoney(amount: number, userId: number): Promise<any> {
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
    public createMovemnet(transferredFromUserId: number,
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
    public getBalanceUser(userId: number): Promise<any> {
        return Balance.findOne( { where: { userId: { [Op.eq]: userId }}});
    }
 }
export const balanceRepository = new BalanceRepository();
