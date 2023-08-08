import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const key = process.env.SECRETKEY as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token
  try{
  const tokenExists = jwt.verify(token as string,key)
  return res.status(200).json({message:'Podes Entrar'});
  }
  catch{
    return res.status(405).json({ error: 'No podes Entrar' });
  }
}