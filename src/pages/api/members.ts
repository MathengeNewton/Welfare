import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'src/mock/json/members.json');
  if (req.method === 'GET') {
    const data = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json(JSON.parse(data));
  } else if (req.method === 'POST') {
    const members = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    members.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(members, null, 2));
    res.status(201).json(req.body);
  } else {
    res.status(405).end();
  }
}
