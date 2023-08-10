import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const key = process.env.SECRETKEY as string;
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.users.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({email: req.body.email}, key);

      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; Max-Age=${3600 * 24 * 7}`
      );

      return res.status(200).json({message:'inicio de sesion exitoso'});

    } catch (error) {

      console.error('Error al iniciar sesión:', error);

      return res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}