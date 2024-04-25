export const typeDef = /* GraphQL */ `
  type Query {
    user: User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
  }

  input NewUserInput {
    name: String!
    age: Int!
  }

  type User {
    id: Int
    name: String!
    age: Int!
  }
`;

export const resolvers = {
  Query: {
    user() {
      return {
        id: 1,
        name: "Het Patel",
      };
    },
  },

  Mutation: {
    createUser: (_, { user }) => {
      // Insert into DB

      return {
        id: 1,
        ...user,
      };
    },
  },

  User: {
    name(obj) {
      return obj.name.trim().toUpperCase();
    },
  },
};
