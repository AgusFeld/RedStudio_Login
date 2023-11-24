import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`);
    return res.status(200).json({ message: 'Cierre de sesión exitoso' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}