import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    try {
      const UserExist = await prisma.users.findUnique({ where: { email } });
      if (UserExist) {
        return res.status(409).json({ error: 'El usuario ya existe' });
      }

      const hashedPassword = await bcrypt.hash(password, 1);

      const nUser = await prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      return res.status(500).json({ error: 'Ocurrió un error al registrar el usuario' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}