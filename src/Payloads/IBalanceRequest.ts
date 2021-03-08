/**
 * @swagger
 *  components:
 *    schemas:
 *      IBalanceRequest:
 *        type: object
 *        required:
 *          - userId
 *          - amount
 *        properties:
 *          userId:
 *            type: integer
 *          amount:
 *            type: integer
 *        example:
 *           userId: integer
 *           amount: integer
 */
export interface IBalanceRequest {
    userId: number;
    amount: number;
}
