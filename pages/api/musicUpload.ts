import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './authMiddleware';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {

    try {
      return authMiddleware(req, res, async () => {

        const { name, email, genre, file } = req.body;

        const nUpload = await prisma.music.create({
            data: {
              name,
              email,
              genre,
              file
            },
          });
      });
    } catch (error) {
      return res.status(405).json({ error: 'Ocurrió un error al guardar la música del usuario' });
    }
  }

  return res.status(450).json({ error: 'Método no permitido' });
};

export default handler;