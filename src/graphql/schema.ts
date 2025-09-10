import { buildSchema } from 'graphql';
import { PrismaClient } from '@prisma/client';

export const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    user(id: ID!): User
  }
`);

export const root = (prisma: PrismaClient) => ({
  user: async ({ id }: { id: string }) => {
    const numericId = parseInt(id, 10);
    if (Number.isNaN(numericId)) return null;
    return await prisma.user.findUnique({
      where: { id: numericId },
    });
  },
});
