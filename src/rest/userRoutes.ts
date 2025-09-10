// src/rest/userRoutes.ts
import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export default (prisma: PrismaClient): Router => {
  const router = Router();

  router.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};