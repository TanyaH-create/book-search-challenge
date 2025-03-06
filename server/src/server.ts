import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';

import { createApolloContext } from './services/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    console.error('Original Error:', (error as any).originalError);
    return error;
  },
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // app.use('/graphql', expressMiddleware(server as any, {
  //   context: async ({ req }) => {
  //     // If there's no req or no headers, just return empty context
  //     if (!req || !req.headers) {
  //       return {};
  //     }
  
  //     const authHeader = req.headers.authorization;
  
  //     if (!authHeader) {
  //       // No auth needed
  //       return {};
  //     }
  
  //     try {
  //       const token = authHeader.split(' ')[1];
  //       const secretKey = process.env.JWT_SECRET_KEY || '';
  
  //       if (!token || !secretKey) {
  //         return {};
  //       }
  
  //       const user = jwt.verify(token, secretKey);
  //       return { user };
  //     } catch (error) {
  //       console.error('Token verification failed:', error);
  //       return {};
  //     }
  //   }
  // }));

  app.use('/graphql', expressMiddleware(server as any,
    {
      context: createApolloContext;
    }
  ));

// Add the error handler AFTER all other middleware and routes
// The ErrorRequestHandler type helps TypeScript understand this is an error handler
const errorHandler: ErrorRequestHandler = (err, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Express Error:', err);
  res.status(500).send('Something broke!');
};

app.use(errorHandler);


  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
// In connection.ts or where you set up MongoDB
db.once('open', () => {
  console.log('MongoDB connection established successfully');
});


  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();