import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"



const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Scatch API",
      version: "1.0.0",
      description: "API documentation for SCATCH BACKEND",
    },
    servers: [
      {
        url: "http://localhost:8000/api",
      },
    ],
  },
  apis: [
  "./src/routes/user.routes.js",
  "./src/routes/cart.routes.js",
  "./src/routes/products.routes.js",
  "./src/routes/order.routes.js",
  "./src/routes/payment.routes.js",
  "./src/docs/schemas.js"
]

}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

export const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log(`📚 Swagger Docs available at http://localhost:${port}/api-docs`)
}
