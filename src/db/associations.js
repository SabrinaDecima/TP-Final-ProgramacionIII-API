import { User } from '../models/User.js';
import { Role } from '../models/Role.js';

User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role',
});
