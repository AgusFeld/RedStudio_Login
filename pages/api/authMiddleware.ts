import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const key = process.env.SECRETKEY as string;

interface ExtendedNextApiRequest extends NextApiRequest{
  email: string
}

export function authMiddleware(req: ExtendedNextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token;

    if (!token) {
      return res.status(405).json({message:'Sin autorizacion - No Token'});
    }
    else{
    try{
    const decoded = jwt.verify(token, key) as { email: string };

      req.email = decoded.email

      return res.status(200).json({message:'inicio de sesion exitoso'});
    }
    catch(error){
      return res.status(405).json({message:'Wrong Token'})
    }
    }
}