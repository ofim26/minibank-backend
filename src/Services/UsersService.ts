import bcrypt from "bcrypt";
import express from "express";
import * as jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { jwtConfig } from "../config/jwtconfig";
import { Balance } from "../Models/Balance";
import { User } from "../Models/User";

/**
 * UsersService
 */
class UsersService {
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    public authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
        User.findOne( { where: {[Op.and]: [{ email: req.body.email.toLowerCase()}]} })
        .then((data) => {
            if (data && bcrypt.compareSync(req.body.password, data.password)) {
                const token = jwt.sign({ name: data.name }, jwtConfig.SECRET);
                res.status(200).json({
                    id: data.id,
                    name: data.name,
                    rut: data.rut,
                    email: data.email,
                    token
                });
            } else {
                res.status(401).json({ status: "error", code: "unauthorized" });
            }
        }).catch(next);
    }

    /**
     * findAll
     *
     * @param req
     * @param res
     * @param next
     */
    public async findAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            await User.findAll()
            .then((users) => res.json(users))
            .catch(next);
        } catch (error) {
            next(error);
        }
    }

    /**
     * create
     *
     * @param req
     * @param res
     * @param next
     */
    public async create(req: express.Request, res: express.Response, next: express.NextFunction) {
        /**
         * Request validations
         */
        if (!req.body.name) {
            res.status(400).send({
                message: "FIELD_NAME_CAN_NOT_BE_EMPTY"
            });
        }
        if (!req.body.email) {
            res.status(400).send({
                message: "FIELD_EMAIL_CAN_NOT_BE_EMPTY"
            });
        }
        if (!req.body.rut) {
            res.status(400).send({
                message: "FIELD_RUT_CAN_NOT_BE_EMPTY"
            });
        }
        if (!req.body.password) {
            res.status(400).send({
                message: "FIELD_PASSWORD_CAN_NOT_BE_EMPTY"
            });
        }

        /**
         * Database validations
         */
        const condition = { [Op.or]: [ { email: req.body.email.toLowerCase() }, { rut: req.body.rut } ] };
        await User.findOne({ where: condition, raw: true })
        .then((data) => {
            if (data !== null) {
                res.status(400).send({
                    message: "RUT_OR_EMAIL_EXIST"
                });
                return;
            }
        }).catch(next);

        /**
         * Create User
         */
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const user = {
            name: req.body.name.toLowerCase(),
            password: passwordHash,
            email: req.body.email.toLowerCase(),
            rut: req.body.rut
        };
        let userId: number = 0;
        let userData: object = {};
        await User.create(user).then((data) => {
            userId = data.id;
            userData = data;
        }).catch(next);

        /**
         * init balance
         */
        const balance = {
            userId,
            balance: 0,
        };
        Balance.create(balance).then((data) => {
            console.log(data);
        }).catch(next);
        res.status(201).json(userData);
    }
}
export const usersService = new UsersService();
