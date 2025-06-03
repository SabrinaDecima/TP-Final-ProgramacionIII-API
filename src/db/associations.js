// relaciones.js (o como se llame tu archivo de asociaciones)
import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import { GymClass } from '../models/GymClass.js';
import { UserGymClass } from '../models/UserGymClass.js';
import { Cuota } from '../models/Cuota.js';

// Relación 1:N - User → Role
User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role',
});

// Relación N:M - User ↔ GymClass
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

User.hasMany(Cuota, {
  foreignKey: 'userId',
  as: 'cuotas',
});

Cuota.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});