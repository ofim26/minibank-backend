import bodyParser from "body-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { sequelize } from "./config/sequelize";
import { getSwaggerSpecs } from "./config/swagger";
import { balanceRoutes } from "./Routes/BalanceRoutes";
import {handleError} from "./Routes/Error";
import { movementsRoutes } from "./Routes/MovementsRoutes";
import { usersRoutes } from "./Routes/UsersRoutes";

// Set up app
const app = express();

// CORS
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// Test Connect to DB
sequelize.authenticate()
    .then(() => console.log("Connected to DB"))
    .catch(() => {throw new Error("Not connected to DB"); });

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Swagger & Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(getSwaggerSpecs(), { explorer: true }));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use("/api/users", usersRoutes.findAll());
app.use("/api/users", usersRoutes.create());
app.use("/api/users", usersRoutes.authenticate());
app.use("/api/movements", movementsRoutes.findAllByUserId());
app.use("/api/balance", balanceRoutes.getBalanceByUserId());
app.use("/api/balance", balanceRoutes.add());
app.use("/api/balance", balanceRoutes.withdraw());
app.use("/api/balance", balanceRoutes.transfer());
app.use(handleError);

// Port
const port = process.env.PORT || 3001;

// Run server
app.listen(port, () => console.log(`APP listening on port ${port}!`));
