import express, { Router } from "express";

/**
 * @swagger
 *  components:
 *    schemas:
 *      Error:
 *        type: object
 *        properties:
 *          message:
 *            type: object
 *        example:
 *           message: object
 */
export const handleError = (err: any, req: express.Request, res: express.Response, next: express.NextFunction)  => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.errors
        }
    });
};
