// src/Server.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { graphqlHTTP } from 'express-graphql'; // <-- Usando express-graphql
import { schema as gqlSchema, root as gqlRoot } from './graphql/schema'; 
import userRoutes from './rest/userRoutes';

export class Server {
  private static _instance: Server;
  public readonly app: Application;
  public readonly prisma: PrismaClient;
  private readonly port: number;

  private constructor() {
    this.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    this.app = express();
    this.prisma = new PrismaClient();

    this._setupMiddlewares();
    this._setupSwagger();
    this._setupRestRoutes();
    this._setupGraphQL();
  }

  public static getInstance(): Server {
    if (!Server._instance) {
      Server._instance = new Server();
    }
    return Server._instance;
  }

  private _setupMiddlewares(): void {
    this.app.use(express.json());

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const allowedHosts = ['example.com', 'localhost:3000'];
      const host = req.get('host');
      if (!host || !allowedHosts.includes(host)) {
        return res.status(403).json({ error: `Access Forbidden: Invalid Host.` });
      }
      next();
    });
  }

  private _setupSwagger(): void {
    const swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'User API',
          version: '1.0.0',
          description: 'A simple Express User API documented with Swagger',
        },
        servers: [{ url: `http://localhost:${this.port}` }],
        components: {
          schemas: {
            User: {
              type: 'object',
              required: ['id', 'name'],
              properties: {
                id: { type: 'integer', description: 'El ID del usuario' },
                name: { type: 'string', description: 'El nombre del usuario' },
              },
              example: { id: 1, name: 'Jane Doe' },
            },
          },
        },
        paths: {
          '/api/users/{id}': {
            get: {
              summary: 'Obtiene un usuario por su ID',
              tags: ['Users'],
              parameters: [
                {
                  in: 'path',
                  name: 'id',
                  schema: { type: 'integer' },
                  required: true,
                  description: 'El ID del usuario',
                },
              ],
              responses: {
                '200': {
                  description: 'El objeto del usuario',
                  content: {
                    'application/json': {
                      schema: {
                        '$ref': '#/components/schemas/User',
                      },
                    },
                  },
                },
                '404': {
                  description: 'Usuario no encontrado',
                },
              },
            },
          },
        },
      },
      apis: [], // El array está vacío porque ya no leemos comentarios de archivos
    };

    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
  
  private _setupRestRoutes(): void {
    this.app.use('/api', userRoutes(this.prisma));
  }

  private _setupGraphQL(): void {
    this.app.use('/graphql', graphqlHTTP({
        schema: gqlSchema,
        rootValue: gqlRoot(this.prisma),
        graphiql: true, // Habilitamos la interfaz interactiva
      })
    );
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
      console.log(`📚 Swagger Docs available on http://localhost:${this.port}/api-docs`);
      console.log(`🕸️ GraphQL Playground available on http://localhost:${this.port}/graphql`);
    });
  }
}