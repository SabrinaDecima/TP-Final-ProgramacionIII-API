import { Role } from '../models/Role.js';
import { User } from '../models/User.js';

export async function initializeDefaults() {
    const defaultRoles = ['superadmin', 'admin', 'member'];

    for (const roleName of defaultRoles) {
        await Role.findOrCreate({
            where: { name: roleName },
            defaults: { name: roleName },
        });
    }

    const superadminRole = await Role.findOne({ where: { name: 'superadmin' } });
    const adminRole = await Role.findOne({ where: { name: 'admin' } });
    const memberRole = await Role.findOne({ where: { name: 'member' } });

    // Usuarios por defecto
    const defaultUsers = [
        {
            name: 'martin',
            lastname: 'f',
            email: 'martin@gmail.com',
            password: '123',
            roleId: superadminRole.id,
        },
        {
            name: 'sabrina',
            lastname: 'd',
            email: 'sabrina@gmail.com',
            password: '123',
            roleId: superadminRole.id,
        },
        {
            name: 'francisco',
            lastname: 'c',
            email: 'francisco@gmail.com',
            password: '123',
            roleId: superadminRole.id,
        },
        {
            name: 'admin',
            lastname: 'admin',
            email: 'admin@gmail.com',
            password: '123',
            roleId: adminRole.id,
        },
        {
            name: 'member',
            lastname: 'member',
            email: 'member@gmail.com',
            password: '123',
            roleId: memberRole.id,
        }
    ];

    for (const userData of defaultUsers) {
        await User.findOrCreate({
            where: { email: userData.email },
            defaults: userData,
        });
    }
}

