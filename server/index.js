import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Import routes - using dynamic import for ES modules
import('./routes/linkedin.js').then(linkedInModule => {
  // Use routes
  app.use('/api/linkedin', linkedInModule.default || linkedInModule);
});

// POST /api/login — authenticate admin login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ id: admin.id, username: admin.username });
});

// POST /api/posts — create a new blog post
app.post('/api/posts', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
  const post = await prisma.blogPost.create({ data: { title, content } });
  res.status(201).json(post);
});

// GET /api/posts — get all blog posts
app.get('/api/posts', async (req, res) => {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(posts);
});

// PUT /api/posts/:id — update a blog post
app.put('/api/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const post = await prisma.blogPost.update({
    where: { id: Number(id) },
    data: { title, content },
  });
  res.json(post);
});

// DELETE /api/posts/:id — delete a blog post
app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.blogPost.delete({ where: { id: Number(id) } });
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});