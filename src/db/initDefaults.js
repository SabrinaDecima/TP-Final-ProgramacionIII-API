import { Role } from '../models/Role.js';
import { User } from '../models/User.js';
import { Cuota } from '../models/Cuota.js';  // <-- Importar Cuota

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

    // Usuarios por defecto (agregado telNumber obligatorio y plan opcional)
    const defaultUsers = [
        {
            name: 'martin',
            lastname: 'f',
            email: 'martin@gmail.com',
            password: '123',
            telNumber: '1111111111',
            plan: null,
            roleId: superadminRole.id,
        },
        {
            name: 'sabrina',
            lastname: 'd',
            email: 'sabrina@gmail.com',
            password: '123',
            telNumber: '2222222222',
            plan: null,
            roleId: superadminRole.id,
        },
        {
            name: 'francisco',
            lastname: 'c',
            email: 'francisco@gmail.com',
            password: '123',
            telNumber: '3333333333',
            plan: null,
            roleId: superadminRole.id,
        },
        {
            name: 'admin',
            lastname: 'admin',
            email: 'admin@gmail.com',
            password: '123',
            telNumber: '4444444444',
            plan: null,
            roleId: adminRole.id,
        },
        {
            name: 'member',
            lastname: 'member',
            email: 'member@gmail.com',
            password: '123',
            telNumber: '5555555555',
            plan: 'basic',
            roleId: memberRole.id,
        },
    ];

    for (const userData of defaultUsers) {
        const [user, created] = await User.findOrCreate({
            where: { email: userData.email },
            defaults: userData,
        });

        await user.reload();

        console.log(`Usuario: ${user.email}, created: ${created}, roleId: ${user.roleId} (memberRole.id: ${memberRole.id})`);

        if (created && user.roleId === memberRole.id) {
            console.log(`Creando cuotas para usuario ${user.email}`);

            const cuotas = [];
            for (let month = 1; month <= 12; month++) {
                cuotas.push({ userId: user.id, month, amount: 5000, paid: false });
            }

            try {
                await Cuota.bulkCreate(cuotas);
                console.log(`Cuotas creadas para ${user.email}`);
            } catch (error) {
                console.error(`Error creando cuotas para ${user.email}:`, error);
            }
        }
    }
}
