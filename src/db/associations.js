import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import { GymClass } from '../models/GymClass.js';
import { UserGymClass } from '../models/UserGymClass.js';
import { Cuota } from '../models/Cuota.js';

// ✅ Esta línea es la que te falta:
Role.hasMany(User, {
  foreignKey: 'roleId',
  as: 'users',
});

// User → Role (N:1)
User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role',
});

// User ↔ GymClass (N:M)
User.belongsToMany(GymClass, {
  through: UserGymClass,
  foreignKey: 'userId',
  otherKey: 'gymClassId',
  as: 'gymClasses',
});

GymClass.belongsToMany(User, {
  through: UserGymClass,
  foreignKey: 'gymClassId',
  otherKey: 'userId',
  as: 'users',
});

// User → Cuota (1:N)
User.hasMany(Cuota, {
  foreignKey: 'userId',
  as: 'cuotas',
});

Cuota.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});
