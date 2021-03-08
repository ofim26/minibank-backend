export const dbConfig = {
    HOST: "ec2-52-7-115-250.compute-1.amazonaws.com",
    USER: "coxhvhvaihmfsb",
    PASSWORD: "702e92618acde88b26b5a60756cd0ed959e8bc8449bb51393909d074dac5d091",
    DB: "dbj6arm6pkml4o",
    PORT: 5432,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
