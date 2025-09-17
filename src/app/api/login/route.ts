import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { User } from '@/types/user';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const filePath = path.join(process.cwd(), 'src/mock/json/users.json');
  const users: User[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _pw, ...userSafe } = user;
  return NextResponse.json(userSafe);
}
