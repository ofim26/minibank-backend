import express, { Router } from "express";
import { jwtToken } from "../config/JwtToken";
import { usersService } from "../Services/UsersService";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users
 */
class UsersRoutes {
    public router: Router = express.Router();

    /**
     * authenticate
     */
    public authenticate(): Router {
        /**
         * @swagger
         * path:
         *  /users/authenticate:
         *    post:
         *      summary: Authenticate
         *      tags: [Users]
         *      consumes:
         *        - application/json
         *      requestBody:
         *        description: IUser Authenticate
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/IUserAuthenticateRequest'
         *      responses:
         *        "200":
         *          description: User
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/User'
         *        "401":
         *          description: Unauthorized
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/Error'
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
        this.router.post("/authenticate", usersService.authenticate);
        return this.router;
    }

    /**
     * findAll
     */
    public findAll(): Router {
        /**
         * @swagger
         * path:
         *  /users:
         *    get:
         *      summary: Get All users
         *      tags: [Users]
         *      responses:
         *        "200":
         *          description: List users
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/User'
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
        this.router.get("/", jwtToken.verifyToken, usersService.findAll);
        return this.router;
    }

    /**
     * create
     */
    public create(): Router {
        /**
         * @swagger
         * path:
         *  /users:
         *    post:
         *      summary: Create User
         *      tags: [Users]
         *      consumes:
         *        - application/json
         *      requestBody:
         *        description: Iterface User Request
         *        required: true
         *        content:
         *          application/json:
         *            schema:
         *              $ref: '#/components/schemas/IUserRequest'
         *      responses:
         *        "201":
         *          description: Created User
         *          content:
         *            application/json:
         *              schema:
         *                $ref: '#/components/schemas/User'
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
        this.router.post("/", usersService.create);
        return this.router;
    }
}
export const usersRoutes = new UsersRoutes();
