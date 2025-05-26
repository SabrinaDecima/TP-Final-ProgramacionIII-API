import express from 'express';
import { PORT } from './config.js';
import { sequelize } from './db.js';
import gymClassRoutes from './routes/gymClass.routes.js';
import UserRoutes from './routes/user.routes.js';
import { Role } from './models/Role.js';

// Importar modelos para asegurar que existen antes de sync()
import './models/Role.js';
import './models/User.js';
import './models/gymClass.js';
import './db/associations.js';

const app = express();

try {
  await sequelize.sync({ force: false });
  const defaultRoles = ['superadmin', 'admin', 'socio'];

  for (const roleName of defaultRoles) {
    await Role.findOrCreate({
      where: { name: roleName },
      defaults: { name: roleName },
    });
  }

  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

  app.use(gymClassRoutes);
  app.use(UserRoutes);

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
} catch (error) {
  console.error('Error during initialization:', error);
}
