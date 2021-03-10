import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Movement } from "./Movement";

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - rut
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          rut:
 *            type: string
 *          createdAt:
 *            type: date($date-time)
 *        example:
 *           id: 0
 *           name: string
 *           email: string
 *           password: string
 *           rut: string
 *           createdAt: 2020-11-20T16:08:46.487Z
 */
@Table({schema: "minibank", tableName: "users", timestamps: false})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: "id"
  })
  public id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: "name"
  })
  public name: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
    field: "email"
  })
  public email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: "password"
  })
  public password: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
    field: "rut"
  })
  public rut: string;

  @Column({
    type: DataType.DATE,
    field: "created_at"
  })
  public createdAt: Date;

  @HasMany(() => Movement)
  public movements: Movement[];
}