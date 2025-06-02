import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPosts = async (req, res) => {
  const posts = await prisma.blogPost.findMany();
  res.json(posts);
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const newPost = await prisma.blogPost.create({
    data: { title, content },
  });
  res.status(201).json(newPost);
};