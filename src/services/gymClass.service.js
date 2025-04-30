import { GymClass } from "../models/gymClass.js";

export const findGymClasses = async (req, res) => {
  const gymClasses = await GymClass.findAll();
  res.json(gymClasses);
};

export const createGymClass = async (req, res) => {
  const { name, instructor, durationMinutes, isActive } = req.body;

  // name e instructor son obligatorios
  if (!name || !instructor) {
    return res.status(400).send({
      message: "El nombre y el instructor son campos requeridos",
    });
  }

  try {
    const newClass = await GymClass.create({
      name,
      instructor,
      durationMinutes,
      isActive,
    });

    res.send(newClass);
  } catch (error) {
    res.status(500).send({ message: "Error al crear la clase", error });
  }
};
