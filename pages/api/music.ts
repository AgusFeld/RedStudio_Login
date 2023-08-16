import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './authMiddleware';

interface ExtendedNextApiRequest extends NextApiRequest {
  email?: string;
}

const prisma = new PrismaClient();

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {

    try {
      return authMiddleware(req, res, async () => {
        const userHistory = await prisma.music.findUnique({
          where: { email : req.email as string },
          select: { genre: true, file: true, name: true },
        });
    
        if (userHistory) {
          return res.status(200).json(userHistory);
        } else {
          return res.status(200).json({ error: 'No se encontró al usuario' });
        }
      });
    } catch (error) {
      return res.status(405).json({ error: 'Ocurrió un error al recuperar la música del usuario' });
    }
  }

  return res.status(450).json({ error: 'Método no permitido' });
};

export default handler;