export const dbConfig = {
    HOST: "ec2-52-44-31-100.compute-1.amazonaws.com",
    DB: "dp5djf7fcmlvu",
    USER: "dnfaxchwacjtjl",
    PORT: 5432,
    PASSWORD: "ae70f7a3f5e142ba104f95779cd9c4a218421c06e9a84ed88e4a2166702e17f1",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
