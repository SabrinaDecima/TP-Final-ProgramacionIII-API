import { GymClass } from "../models/GymClass.js";

export const findGymClasses = async (req, res) => {
  const gymClasses = await GymClass.findAll();
  res.json(gymClasses);
};

export const findGymClass = async (req, res) => {
  const { id } = req.params;
  const gymClass = await GymClass.findOne({ where: { id } });

  if (!gymClass)
    return res.status(404).send({ message: "Clase no encontrada" });

  res.json(gymClass);
}

export const createGymClass = async (req, res) => {
  const { name, instructor, durationMinutes, imageUrl } = req.body;

  // name e instructor son obligatorios
  if (!name || !instructor) {
    return res.status(400).send({
      message: "El nombre y el instructor son campos requeridos",
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
    return res.status(400).send("El nombre y el instructor son campos requeridos");


  const gymClass = await GymClass.findByPk(id);

  if (!gymClass)
    return res.status(404).send({ message: "Clase no encontrada" });


  await gymClass.update({
    name,
    instructor,
    durationMinutes,
    imageUrl
  });

  await gymClass.save();

  res.send(gymClass);

};

export const deleteGymClass = async (req, res) => {
  const { id } = req.params;
  const gymClass = await GymClass.findByPk(id);
  if (!gymClass) return res.status(404).send({ message: "Clase no encontrada" });
  await gymClass.destroy();
  res.send(`Clase con id: ${id} eliminada`);
}
