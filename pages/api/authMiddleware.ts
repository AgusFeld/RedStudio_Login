import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const key = process.env.SECRETKEY as string;

interface ExtendedNextApiRequest extends NextApiRequest {
  email?: string;
}

export async function authMiddleware(
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  handler: (req: ExtendedNextApiRequest, res: NextApiResponse) => Promise<void>
) {
  console.log('Authorization header:', req.headers.authorization); // Debug

  const authorizationToken = req.headers.authorization as string;

  const token = authorizationToken.split(' ')[1];

  console.log('Token:', token); // Debug

  if (!token) {
    console.log('No hay token'); // Debug
    res.writeHead(302, { Location: '/login' });
    return res.end();
  } else {
    try {
      const decoded = jwt.verify(token, key) as { email: string };
      console.log('Token decodificado:', decoded); // Debug
      req.email = decoded.email;
      await handler(req, res); // Invocar el handler sin return
    } catch (error) {
      console.error('Error al verificar el token:', error); // Debug
      res.writeHead(302, { Location: '/login' });
      return res.end();
    }
  }
}