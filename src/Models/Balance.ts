import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

/**
 * @swagger
 *  components:
 *    schemas:
 *      Balance:
 *        type: object
 *        required:
 *          - id
 *          - user_id
 *          - balance
 *        properties:
 *          id:
 *            type: integer
 *          user_id:
 *            type: integer
 *          balance:
 *            type: string
 *            minimum: 0
 *        example:
 *           id: 0
 *           user_id: integer
 *           balance: string
 */
@Table({schema: "minibank", tableName: "balance", timestamps: false})
export class Balance extends Model {
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
  @Unique
  @Column({
    type: DataType.STRING,
    field: "balance"
  })
  public balance: string;
}
