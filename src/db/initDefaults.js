import { Role } from '../models/Role.js';
import { User } from '../models/User.js';
import { Cuota } from '../models/Cuota.js';
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
        {
            name: 'Lucía',
            lastname: 'Gómez',
            email: 'lucia@gmail.com',
            password: '123',
            telNumber: '6666666666',
            plan: 'premium',
            roleId: memberRole.id,
        },
        {
            name: 'Juan',
            lastname: 'Torres',
            email: 'juan@gmail.com',
            password: '123',
            telNumber: '7777777777',
            plan: 'basic',
            roleId: memberRole.id,
        },
        {
            name: 'Ana',
            lastname: 'Martínez',
            email: 'ana@gmail.com',
            password: '123',
            telNumber: '8888888888',
            plan: 'basic',
            roleId: memberRole.id,
        }
    ];

    const defaultGymClasses = [
        {
            name: 'boxeo',
            instructor: 'Juan Perez',
            durationMinutes: 60,
            imageUrl: 'https://entrenaenbarcelona.com/wp-content/uploads/2023/12/6A7A1305-scaled.jpg',
        },
        {
            name: 'funcional',
            instructor: 'Lucía Fernández',
            durationMinutes: 45,
            imageUrl: 'https://i.blogs.es/3ef119/entrenamiento-funcional/1366_2000.webp',
        },
        {
            name: 'zumba',
            instructor: 'Carlos Méndez',
            durationMinutes: 50,
            imageUrl: 'https://www.verywellfit.com/thmb/5g7mfKihpixyGsPXHh8AojylmWs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/4688722-GettyImages-950806258-06e1e050ab184f3694fd96017c9a42ee.jpg',
        },
        {
            name: 'yoga',
            instructor: 'María López',
            durationMinutes: 60,
            imageUrl: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2021/11/pexels-yan-krukov-8436601-copy-768x576.jpg',
        },
    ];

    for (const gymClassData of defaultGymClasses) {
        await GymClass.findOrCreate({
            where: { name: gymClassData.name },
            defaults: gymClassData,
        });
    }

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
