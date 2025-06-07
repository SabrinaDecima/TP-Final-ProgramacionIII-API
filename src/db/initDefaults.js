import { Role } from '../models/Role.js';
import { User } from '../models/User.js';
import { Cuota } from '../models/Cuota.js';  // <-- Importar Cuota
import { GymClass } from '../models/GymClass.js';

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
            name: 'Martin',
            lastname: 'Flecha',
            email: 'martin@gmail.com',
            password: '123',
            telNumber: '1111111111',
            plan: null,
            roleId: superadminRole.id,
        },
        {
            name: 'Sabrina',
            lastname: 'Decima',
            email: 'sabrina@gmail.com',
            password: '123',
            telNumber: '2222222222',
            plan: null,
            roleId: superadminRole.id,
        },
        {
            name: 'Francisco',
            lastname: 'Cumini Londero',
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

    await GymClass.findOrCreate({
        where: { name: 'boxeo' },
        defaults: {
            name: 'boxeo',
            instructor: 'Juan Perez',
            durationMinutes: 60,
            imageUrl: 'https://placehold.co/400',
        },
    });

    for (const userData of defaultUsers) {
        const [user, created] = await User.findOrCreate({
            where: { email: userData.email },
            defaults: userData,
        });

        await user.reload();

        console.log(`Usuario: ${user.email}, created: ${created}, roleId: ${user.roleId} (memberRole.id: ${memberRole.id})`);

        if (created && user.roleId === memberRole.id) {
            const currentMonth = new Date().getMonth() + 1;

            try {
                await Cuota.create({
                    userId: user.id,
                    month: currentMonth,
                    amount: 50000,
                    paid: true,
                });

                console.log(`Primera cuota pagada creada para ${user.email} (mes ${currentMonth})`);
            } catch (error) {
                console.error(`Error creando cuota para ${user.email}:`, error);
            }
        }

    }
}
