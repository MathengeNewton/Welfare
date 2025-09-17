
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import type { User } from '@/types/user';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password: inputPassword } = req.body;
  const filePath = path.join(process.cwd(), 'src/mock/json/users.json');
  const users: User[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const user = users.find((u) => u.email === email && u.password === inputPassword);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  // For demo, return user info (never return password in real app)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...userSafe } = user;
  res.status(200).json(userSafe);
}
