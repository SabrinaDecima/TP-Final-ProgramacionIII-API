import { GymClass } from '../models/GymClass.js';
import { User } from '../models/User.js';

export const findGymClasses = async (req, res) => {
  const gymClasses = await GymClass.findAll();
  res.json(gymClasses);
};

export const findGymClass = async (req, res) => {
  const { id } = req.params;
  const gymClass = await GymClass.findOne({ where: { id } });

  if (!gymClass)
    return res.status(404).send({ message: 'Clase no encontrada' });

  res.json(gymClass);
};

export const createGymClass = async (req, res) => {
  const { name, instructor, durationMinutes, imageUrl } = req.body;

  // name e instructor son obligatorios
  if (!name || !instructor) {
    return res.status(400).send({
      message: 'El nombre y el instructor son campos requeridos',
    });
  }

  const newClass = await GymClass.create({
    name,
    instructor,
    durationMinutes,
    imageUrl,
  });

  res.send(newClass);
};

export const updateGymClass = async (req, res) => {
  const { id } = req.params;
  const { name, instructor, durationMinutes, imageUrl } = req.body;

  if (!name || !instructor)
    return res
      .status(400)
      .send('El nombre y el instructor son campos requeridos');

  const gymClass = await GymClass.findByPk(id);

  if (!gymClass)
    return res.status(404).send({ message: 'Clase no encontrada' });

  await gymClass.update({
    name,
    instructor,
    durationMinutes,
    imageUrl,
  });

  await gymClass.save();

  res.send(gymClass);
};

export const deleteGymClass = async (req, res) => {
  const { id } = req.params;
  const gymClass = await GymClass.findByPk(id);
  if (!gymClass)
    return res.status(404).send({ message: 'Clase no encontrada' });
  await gymClass.destroy();
  res.send(`Clase con id: ${id} eliminada`);
};

export const getUsersByClass = async (req, res) => {
  const { id } = req.params;

  try {
    const gymClass = await GymClass.findByPk(id, {
      include: {
        model: User,
        as: 'users',          // nombre de la asociación inversa en GymClass
        attributes: ['id', 'name', 'lastname', 'email'], // datos que quieras mostrar
        through: { attributes: [] }, // para no mostrar datos de la tabla intermedia
      },
    });

    if (!gymClass) {
      return res.status(404).json({ message: 'Clase no encontrada' });
    }

    res.json({ users: gymClass.users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};
