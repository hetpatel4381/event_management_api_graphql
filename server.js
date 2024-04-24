import {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from "graphql";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello(name: String!): String

//     age: Int
//     weight: Float!
//     isOver18: Boolean
//     hobbies: [String!]!

//     user: User
//   },

//   type User{
//     id: Int
//     name: String!
//   }
// `);

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
      resolve(obj) {
        const name = obj.name.trim().toUpperCase();
        if (obj.isAdmin) {
          return `${name} (ADMIN)`;
        }
        return name;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "Hello";
        },
      },

      user: {
        type: User,
        resolve() {
          return {
            id: 1,
            name: "Het Patel",
            extra: "Hey",
            isAdmin: true,
          };
        },
      },
    },
  }),
});

// The rootValue provides a resolver function for each API endpoint
// var rootValue = {
//   hello: ({ name }) => {
//     return "Hello " + name;
//   },
//   age: () => {
//     return 23;
//   },
//   weight: () => {
//     return 68.5;
//   },
//   isOver18() {
//     return true;
//   },
//   hobbies() {
//     return ["Playing Cricket, Reading Books", "Making Stock Market Strategy"];
//   },

//   user() {
//     return {
//       id: 1,
//       name: "Yogesh Saini",
//     };
//   },
// };

// Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: "{ age }",
//   rootValue,
// }).then((response) => {
//   console.log(response);
// });

const app = express();

// app.all("/graphql", createHandler({ schema, rootValue }));

app.all("/graphql", createHandler({ schema }));

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log(`App is Listening to http://localhost:4000`);
  console.log(`Test: http://localhost:4000/graphql?query={hello,age}`);
});
