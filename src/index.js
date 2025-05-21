import express from 'express';

import { PORT } from './config.js';
import { sequelize } from './db.js';
import gymClassRoutes from './routes/gymClass.routes.js';
import loginUserRoutes from './routes/loginUser.routes.js';

import './models/GymClass.js';
import './models/loginUser.js';

const app = express();

try {
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
  app.use(gymClassRoutes);
  app.use(loginUserRoutes);
  app.listen(PORT);

  await sequelize.sync();

  console.log(`Server listening in port: ${PORT} `);
} catch (error) {
  console.log('There was an error on initialization');
}
