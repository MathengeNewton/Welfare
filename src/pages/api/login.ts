import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  const filePath = path.join(process.cwd(), 'src/mock/json/users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const user = users.find((u: any) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  // For demo, return user info (never return password in real app)
  const { password: _, ...userSafe } = user;
  res.status(200).json(userSafe);
}
