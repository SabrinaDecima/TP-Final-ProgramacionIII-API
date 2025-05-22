import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_secreta';

export const registerUser = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    // Crear usuario con roleId por defecto (ej: 1 = 'user')
    const newUser = await User.create({
      name,
      lastname,
      email,
      password,
    });

    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Inicio de sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario con su rol asociado
    const user = await User.findOne({
      where: { email },
      include: { model: Role, as: 'role' },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Enviar respuesta con datos del usuario y su rol
    res.json({
      message: 'Login exitoso',
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
