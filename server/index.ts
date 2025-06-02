// Express server entry point
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); // type inference is sufficient for Express
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Admin registration (for initial setup only, remove or protect in production)
app.post('/api/admin/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const admin = await prisma.admin.create({ data: { username, password: hashed } });
    res.json({ id: admin.id, username: admin.username });
  } catch (e) {
    res.status(400).json({ error: 'Admin already exists' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ id: admin.id, username: admin.username });
});

// Blog post CRUD
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Title and content required' });
  const post = await prisma.blogPost.create({ data: { title, content } });
  res.json(post);
});

app.get('/api/posts', async (req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(posts);
});

app.get('/api/posts/:id', async (req, res) => {
  const post = await prisma.blogPost.findUnique({ where: { id: Number(req.params.id) } });
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

app.put('/api/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.blogPost.update({ where: { id: Number(req.params.id) }, data: { title, content } });
  res.json(post);
});

app.delete('/api/posts/:id', async (req, res) => {
  await prisma.blogPost.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
