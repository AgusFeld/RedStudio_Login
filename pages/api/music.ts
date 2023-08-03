import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;
  
    try {
      const UserHistExist = await prisma.music.findUnique({ 
        where: { email : email },
        select: { genre : true, file : true, name : true }
     });
     if (UserHistExist)
     return res.status(200).json(UserHistExist);
     else{
        return res.status(200).json({error:'no se encontro al usuario'})
     }
    }
    catch (error) {
      return res.status(400).json({ error: 'Ocurrió un error al recuperar la musica del usuario' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}