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
    return await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });
  },
});