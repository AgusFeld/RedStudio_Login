import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from './authMiddleware';
import { v2 as cloudinary } from 'cloudinary';
        
const cloud_name = process.env.cloud_name as string
const api_key = process.env.api_key as string
const api_secret = process.env.api_secret as string

cloudinary.config({ 
  cloud_name, 
  api_key, 
  api_secret 
});

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

        const cloudinaryResponse = await cloudinary.uploader.upload(file, {
          folder: 'songs',
        });

        const fileUrl = cloudinaryResponse.secure_url;

        const nUpload = await prisma.music.create({
          data: {
            name,
            email,
            genre,
            file: fileUrl,
          },
        });

        return res.status(200).json({ message: 'Música enviada con éxito a la base de datos' });
      });
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrió un error al guardar la música del usuario' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
};

export default handler;