import express from "express";
import { ruruHTML } from "ruru/server";
import { createSchema, createYoga } from "graphql-yoga";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
            type Query {
                hello: String
            }
        `,
    resolvers: {
      Query: {
        hello() {
          return "Hello World!";
        },
      },
    },
  }),
});

const app = express();

// app.all("/graphql", createHandler({ schema, rootValue }));

// app.all("/graphql", createHandler({ schema }));

app.all("/graphql", yoga);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log(`App is Listening to http://localhost:4000`);
  console.log(`Test: http://localhost:4000/graphql?query={hello,age}`);
});
