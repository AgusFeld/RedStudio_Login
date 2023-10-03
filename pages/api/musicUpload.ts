import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './authMiddleware';

interface ExtendedNextApiRequest extends NextApiRequest {
  email?: string;
}

const prisma = new PrismaClient();

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {

    try {
      return authMiddleware(req, res, async () => {

        const { name, genre, file } = req.body;
        const email = req.email as string;

        const nUpload = await prisma.music.create({
          
            data: {
              name,
              email,
              genre,
              file
            },
          });
          return res.status(200).json({message:'Musica enviada con exito a la base de datos'});
      });
    } catch (error) {
      return res.status(405).json({ error: 'Ocurrió un error al guardar la música del usuario' });
    }
  }

  return res.status(450).json({ error: 'Método no permitido' });
};

export default handler;