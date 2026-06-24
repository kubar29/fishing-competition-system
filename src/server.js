const app = require('./app');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});