/**
 * @swagger
 *  components:
 *    schemas:
 *      IMovementsRequest:
 *        type: object
 *        required:
 *          - userId
 *          - itemsPerPage
 *          - currentPage
 *        properties:
 *          userId:
 *            type: integer
 *          itemsPerPage:
 *            type: integer
 *          currentPage:
 *            type: integer
 *        example:
 *           userId: integer
 *           itemsPerPage: integer
 *           currentPage: integer
 */
export interface IMovementsRequest {
    userId: number;
    itemsPerPage: number;
    currentPage: number;
}
