import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

// Add this new function specifically for Apollo context
export const createApolloContext = async ({ req }: { req: Request }) => {
  try {
    // Get the token from the headers
    const authHeader = req?.headers?.authorization;
    
    if (!authHeader) {
      return {}; // Not authenticated
    }
    
    // Format of authorization header: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';
    
    if (!token || !secretKey) {
      return {}; // No token or secret
    }
    
    // Verify synchronously instead of using callback
    const user = jwt.verify(token, secretKey) as JwtPayload;
    return { user }; // Add user data to context
  } catch (error) {
    console.error('Authentication error:', error);
    return {}; // Return empty context on error
  }
};


export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  if (!secretKey) {
    console.error('JWT_SECRET_KEY is not set in environment variables');
    throw new Error('Server configuration error');
  }

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
