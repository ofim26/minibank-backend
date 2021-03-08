/**
 * @swagger
 *  components:
 *    schemas:
 *      IUserRequest:
 *        type: object
 *        required:
 *          - name
 *          - password
 *          - rut
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          password:
 *            type: string
 *          rut:
 *            type: string
 *          email:
 *            type: string
 *        example:
 *           name: string
 *           password: string
 *           rut: string
 *           email: string
 */
export interface IUserRequest {
    name: string;
    password: string;
    rut: string;
    email: string;
}
