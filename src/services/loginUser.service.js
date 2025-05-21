import { LoginUser } from '../models/loginUser.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_secreta';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await LoginUser.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login exitoso', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
