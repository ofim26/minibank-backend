/**
 * @swagger
 *  components:
 *    schemas:
 *      IBalanceTransferRequest:
 *        type: object
 *        required:
 *          - userId
 *          - amount
 *          - rut
 *        properties:
 *          userId:
 *            type: integer
 *          amount:
 *            type: integer
 *          rut:
 *            type: string
 *        example:
 *           userId: integer
 *           amount: integer
 *           rut: string
 */
export interface IBalanceRequest {
    userId: number;
    amount: number;
    rut: string;
}
