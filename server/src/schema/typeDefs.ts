const typeDefs = `
type User {
   _id: ID!
   username: String!
   email: String!
   savedBooks: [Book]
   bookCount: Int!
}

# Define the Book type
type Book {
  bookId: String!
  authors: [String]
  description: String
  title: String!
  image: String
  link: String
}

# Define the Auth type
type Auth {
  token: String!
  user: User!
}

# Define the Input type for saving a book
input BookInput {
  bookId: String!
  authors: [String]
  description: String
  title: String!
  image: String
  link: String
}
# Define the Query type
type Query {
    me: User
  }
# Define the Mutation type
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!. password: String!): Auth
  saveBook(book: BookInput!): User
  removeBook(bookId: String!): User
}
`;
