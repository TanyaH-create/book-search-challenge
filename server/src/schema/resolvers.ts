import { User }  from '../models/index.js';
import {  AuthenticationError } from '../services/auth.js';
import { signToken } from '../services/auth.js';
import { Request } from 'express';

// Define Auth type
interface Auth {
  token: string;
  user: IUser;
}

// Define Context type
interface Context {
  user?: IUser;
  req: Request;
}

// Define User type
interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  bookCount: number;
  savedBooks: IBook[];
  isCorrectPassword: (password: string) => Promise<boolean>;
}

// Define Book type
interface IBook {
  bookId: string;
  authors?: string[];
  description?: string;
  title: string;
  image?: string;
  link?: string;
}

// Define Book Input type for mutations
interface BookInput {
  bookId: string;
  authors?: string[];
  description?: string;
  title: string;
  image?: string;
  link?: string;
}

const resolvers =  { 
    Query: {
        me: async (_parent: any, _args: any, context: Context): Promise< typeof User | null> => {
            if (context.user) {
              return await User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
          },
    },
    Mutation: {
      login: async (_parent: any, { email, password }: { email: string; password: string }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw AuthenticationError;
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw AuthenticationError;
        }
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      },
      saveBook: async (_: any, { bookData }: { bookData: BookInput }, context: Context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in!');
        }
  
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
  
        if (!updatedUser) {
          throw new Error('Error saving book.');
        }
  
        return updatedUser;
      },
      removeBook: async (_parent: any, { bookId }: { bookId: string }, context: Context) => {
        if (!context.user) {
          throw new AuthenticationError('You must be logged in!');
        }
  
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
  
        if (!updatedUser) {
          throw new Error("Couldn't find user with this ID!");
        }
  
        return updatedUser;
      },
    },
  };

  export default resolvers;