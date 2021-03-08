// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "../config/dbconfig";
import {Balance} from "../Models/Balance";
import {Movement} from "../Models/Movement";
import {User} from "../Models/User";

/**
 * Sequelize
 */
export const sequelize = new Sequelize({
  host: dbConfig.HOST,
  database: dbConfig.DB,
  dialect: "postgres",
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  storage: ":memory:",
  dialectOptions: {
    ssl: true
  },
  models: [User, Balance, Movement],
});
