import { createServer } from "http";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./models/eventTypeDefs.js";
import { resolvers } from "./resolvers/eventResolvers.js";

// Create Express app
const app = express();

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();

  // Apply middleware to Express app
  server.applyMiddleware({ app });

  // Serve the GraphiQL IDE
  app.get("/", (_req, res) => {
    res.type("html");
    res.end(`<h1>Welcome to Sports Event Management GraphQL API</h1>
      <p>GraphQL Playground available at <a href="/graphql">/graphql</a></p>`);
  });
}

startApolloServer();

// Create HTTP server and listen
const httpServer = createServer(app);
httpServer.listen(3000, () =>
  console.log(`Server is running at http://localhost:3000/graphql`)
);
