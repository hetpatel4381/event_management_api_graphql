import { createSchema } from "graphql-yoga";
import { typeDef as User, resolvers as userResolver } from "./models/userModel.js";
import _ from "lodash";

const queries = /* GraphQL */ `
  type Query {
    hello: String!
    user: User
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "Hello World!";
    },
  },
};

export const schema = createSchema({
  typeDefs: [queries, User],
  resolvers: _.merge(resolvers, userResolver),
});
