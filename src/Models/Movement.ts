import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Movement:
 *        type: object
 *        required:
 *          - id
 *          - userId
 *          - movementType
 *          - amount
 *          - createdAt
 *        properties:
 *          id:
 *            type: integer
 *          userId:
 *            type: integer
 *          movementType:
 *            type: string
 *          amount:
 *            type: integer
 *          createdAt:
 *            type: Date
 *        example:
 *           id: 0
 *           userId: integer
 *           movementType: integer
 *           amount: integer
 *           createdAt: Date
 */
@Table({schema: "minibank", tableName: "movements", timestamps: false})
export class Movement extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id"
  })
  public id: number;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.INTEGER,
    field: "user_id"
  })
  public userId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: "movement_type"
  })
  public movementType: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "amount"
  })
  public amount: number;

  @Column({
    type: DataType.DATE,
    field: "created_at"
  })
  public createdAt: Date;
}
