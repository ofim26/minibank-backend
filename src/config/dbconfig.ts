export const dbConfig = {
    HOST: "localhost",
    USER: "adminbank",
    PASSWORD: "a1s2d3f4",
    DB: "minibank",
    PORT: 5432,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
