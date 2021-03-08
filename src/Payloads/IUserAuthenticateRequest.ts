/**
 * @swagger
 *  components:
 *    schemas:
 *      IUserAuthenticateRequest:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *        example:
 *           email: string
 *           password: string
 */
export interface IUserAuthenticateRequest {
    email: string;
    password: string;
}
