import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const key = process.env.SECRETKEY as string;

interface ExtendedNextApiRequest extends NextApiRequest {
  email?: string;
}

export async function authMiddleware(
  req: ExtendedNextApiRequest,
  res: NextApiResponse,
  handler: (req: ExtendedNextApiRequest, res: NextApiResponse) => Promise<any>
) {

  console.log(req.headers.authorization)

  const authorizationToken = req.headers.authorization as string;

  const token = authorizationToken.split(' ')[1];


  if (!token) {
    console.log('no hay token');
    res.writeHead(302, { Location: '/login' });
    return res.end();
  } else {
    try {
      const decoded = jwt.verify(token, key) as { email: string };
      console.log('Token decodificado:', decoded);
      req.email = decoded.email;
      return handler(req, res);
    } catch (error) {
      console.error('Error al verificar el token:', error);
      res.writeHead(302, { Location: '/login' });
      return res.end();
    }
  }
}