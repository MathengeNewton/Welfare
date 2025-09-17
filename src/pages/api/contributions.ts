import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'src/mock/json/contributions.json');
  if (req.method === 'GET') {
    const data = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json(JSON.parse(data));
  } else if (req.method === 'POST') {
    const contributions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    contributions.push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(contributions, null, 2));
    res.status(201).json(req.body);
  } else {
    res.status(405).end();
  }
}
