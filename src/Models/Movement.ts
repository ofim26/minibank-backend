import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { User } from "./User";

/**
 * @swagger
 *  components:
 *    schemas:
 *      Movement:
 *        type: object
 *        required:
 *          - id
 *          - transferredFromUserId
 *          - movementType
 *          - amount
 *          - createdAt
 *        properties:
 *          id:
 *            type: integer
 *          transferredFromUserId:
 *            type: integer
 *          transferredToUserId:
 *            type: integer
 *          movementType:
 *            type: string
 *          amount:
 *            type: integer
 *          createdAt:
 *            type: Date
 *        example:
 *           id: 0
 *           transferredFromUserId: integer
 *           transferredToUserId: integer
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
    field: "transferred_from_user_id"
  })
  public transferredFromUserId: number;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Unique
  @Column({
    type: DataType.INTEGER,
    field: "transferred_to_user_id"
  })
  public transferredToUserId: number;

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
