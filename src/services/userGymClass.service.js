import { User } from '../models/User.js';
import { GymClass } from '../models/GymClass.js';

export const enrollUserToClass = async (req, res) => {
    const { userId, classId } = req.params;

    try {
        const user = await User.findByPk(userId);
        const gymClass = await GymClass.findByPk(classId);

        if (!user || !gymClass) {
            return res.status(404).json({ error: 'Usuario o clase no encontrada' });
        }

        // Asocia usuario con la clase (tabla intermedia)
        await user.addGymClass(gymClass);

        res.status(200).json({ message: 'Usuario inscrito en la clase con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al inscribir a la clase' });
    }
};

export const getUserClasses = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId, {
            include: {
                model: GymClass,
                as: 'gymClasses',
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ classes: user.gymClasses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener clases del usuario' });
    }
};
