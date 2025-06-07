import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { Role } from '../models/Role.js';
import { Cuota } from '../models/Cuota.js';

const SECRET_KEY = 'mi_clave_secreta';

export const registerUser = async (req, res) => {
  const { name, lastname, email, password, telNumber, plan, roleId } = req.body;

  if (!name || !lastname || !email || !password || !telNumber) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    // Crear usuario con rol por defecto 'member' si no se pasa otro
    const newUser = await User.create({
      name,
      lastname,
      email,
      password,
      telNumber,
      plan: plan || null,
      roleId: roleId || 3,
    });

    // Si el rol es 'member' (id = 3), crear solo UNA cuota paga del mes actual
    if (newUser.roleId === 3) {
      const currentMonth = new Date().getMonth() + 1;

      await Cuota.create({
        userId: newUser.id,
        month: currentMonth,
        amount: 50000,
        paid: true,
      });
    }

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: newUser,
    });
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    user.roleId = roleId;
    await user.save();
    res.json({ message: 'Rol actualizado', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el rol del usuario' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, password } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar solo los campos que se proporcionen
    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.json({ message: 'Usuario actualizado', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

export const pagarCuota = async (req, res) => {
  const { userId, month } = req.body;

  if (!userId || !month) {
    return res.status(400).json({ error: 'Faltan datos: userId y month son requeridos' });
  }

  try {
    let cuota = await Cuota.findOne({ where: { userId, month } });

    if (!cuota) {
      // Crear cuota nueva para ese mes, y marcarla como pagada
      cuota = await Cuota.create({
        userId,
        month,
        amount: 50000, // o el monto que corresponda
        paid: true,
      });
      return res.json({ message: 'Cuota creada y pagada exitosamente', cuota });
    }

    if (cuota.paid) {
      return res.status(400).json({ error: 'La cuota ya está pagada' });
    }

    cuota.paid = true;
    await cuota.save();

    res.json({ message: 'Cuota pagada exitosamente', cuota });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al pagar la cuota' });
  }
};


export const getCuotasImpagas = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'lastname', 'email'],
      include: {
        model: Cuota,
        as: 'cuotas',
        attributes: ['month', 'paid'],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const cuotasMap = {};
    user.cuotas.forEach(cuota => {
      cuotasMap[cuota.month] = cuota;
    });

    const currentMonth = new Date().getMonth() + 1;
    const detalleMeses = [];

    for (let mes = 1; mes <= 12; mes++) {
      const cuota = cuotasMap[mes];

      let estado;

      if (cuota) {
        estado = cuota.paid ? 'paga' : 'impaga';
      } else {
        estado = mes < currentMonth ? 'no generada' : 'impaga';
      }

      detalleMeses.push({
        mes,
        estado,
      });
    }

    const totalPagadas = detalleMeses.filter(m => m.estado === 'paga').length;
    const totalImpagas = detalleMeses.filter(m => m.estado === 'impaga').length;
    const cuotasNoGeneradas = detalleMeses.filter(m => m.estado === 'no generada').length;

    res.json({
      usuario: {
        id: user.id,
        nombre: `${user.name} ${user.lastname}`,
        email: user.email,
      },
      detalle_meses: detalleMeses,
      resumen: {
        total_pagadas: totalPagadas,
        total_impagas: totalImpagas,
        cuotas_no_generadas: cuotasNoGeneradas,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cuotas impagas' });
  }
};






