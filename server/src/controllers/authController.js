import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { username, password } = req.body;

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return res.status(401).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.json({ message: 'Login successful' });
};