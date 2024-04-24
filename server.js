import { graphql, buildSchema } from "graphql";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    age: Int
  }
`);

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return "Hello world 123!";
  },
  age: () => {
    return 23;
  },
};

// Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: "{ age }",
//   rootValue,
// }).then((response) => {
//   console.log(response);
// });

const app = express();

app.all("/graphql", createHandler({ schema, rootValue }));

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log(`App is Listening to http://localhost:4000`);
  console.log(`Test: http://localhost:4000/graphql?query={hello,age}`);
});
