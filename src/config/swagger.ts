import swaggerJsdoc from "swagger-jsdoc";

export const getSwaggerSpecs = (): object => {
    const options = {
        swaggerDefinition: {
          openapi: "3.0.0",
          info: {
            title: "Minibank",
            version: "1.0.0",
            description: "A test project with express API",
            license: {
              name: "MIT",
              url: "https://choosealicense.com/licenses/mit/"
            },
            contact: {
              name: "Swagger",
              url: "https://swagger.io",
              email: "ofim26@gmail.com"
            }
          },
          servers: [
            {
              url: "/api"
            }
          ],
          components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              }
            }
          },
          security: [{
            bearerAuth: [] as any[]
          }]
        },
        apis: [
          "./src/Routes/Error.ts",
          "./src/Models/User.ts",
          "./src/Routes/UsersRoutes.ts",
          "./src/Models/Balance.ts",
          "./src/Routes/BalanceRoutes.ts",
          "./src/Models/Movement.ts",
          "./src/Routes/MovementsRoutes.ts",
          "./src/Payloads/IUserRequest.ts",
          "./src/Payloads/IBalanceRequest.ts",
          "./src/Payloads/IBalanceTransferRequest.ts",
          "./src/Payloads/IUserAuthenticateRequest.ts",
          "./src/Payloads/IMovementsRequest.ts"
        ]
    };
    const specs = swaggerJsdoc(options);
    return specs;
};
