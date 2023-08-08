import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const key = process.env.SECRETKEY as string;

export interface DecodedToken {
  email: string;
}

declare module 'next' {
  interface NextApiRequest {
    user?: DecodedToken; 
  }
}

export default function authMiddleware(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login');
    }

    try {
      const decoded = jwt.verify(token, key) as DecodedToken;
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.redirect('/login');
    }
  };
}