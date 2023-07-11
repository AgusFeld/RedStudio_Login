import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const secretKey = process.env.SECRET;
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

      const token = sign({ userId: user.id }, secretKey as string, { expiresIn: '1h' });

      // Generar una cookie única
      const cookieToken = uuidv4();

      // Guardar la cookie única en la base de datos
      await prisma.users.update({
        where: { id: user.id },
        data: { cookieToken },
      });

      const cookie = serialize('token', token, {
        httpOnly: true,
        maxAge: 60 * 60, 
        path: '/',
      });

      res.setHeader('Set-Cookie', cookie);

      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return res.status(500).json({ error: 'Ocurrió un error al iniciar sesión' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}