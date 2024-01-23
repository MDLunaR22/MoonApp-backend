require('dotenv').config();
const app = require('./models/server');
const sequelize = require('./database/db')

// Funcion de conexion
sequelize.authenticate()
  .then(() => {
    console.log('Connected to DB');
    app.initServer();
  })
  .catch((error) => {
    console.error('Cannot connect to DB:', error);
    process.exit(1);
  });