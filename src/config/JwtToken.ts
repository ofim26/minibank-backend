import express from "express";
import * as jwt from "jsonwebtoken";
import { jwtConfig } from "./jwtconfig";

/**
 * Jwt
 */
class JwtToken {
    /**
     * verifyToken
     *
     * @param req
     * @param res
     * @param next
     */
    public async verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (!req.headers.authorization) {
                return res.status(401).send("Unauhtorized Request");
            }
            const token = req.headers.authorization.split(" ")[1];
            if (token === "null") {
                return res.status(401).send("Unauhtorized Request");
            }

            const payload = await jwt.verify(token, jwtConfig.SECRET);
            if (!payload) {
                return res.status(401).send("Unauhtorized Request");
            }
            next();
        } catch (e) {
            // console.log(e)
            return res.status(401).send("Unauhtorized Request");
        }
    }
}
export const jwtToken = new JwtToken();
