import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';

const key = process.env.SECRETKEY as string;

interface AuthenticatedRequest extends NextApiRequest {
  user?: { email: string };
}

export default function authMiddleware(handler: Function) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const token = req.cookies.token || ''; 

    try {
      const decodedToken = jwt.verify(token, key) as { email: string };
      req.user = { email: decodedToken.email }; 

      return handler(req, res);
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }
  };
}