import express from "express";
import { createServer } from "http";
import { ApolloServer, gql } from "apollo-server-express";
import { v4 as uuidv4 } from "uuid";

// Sample in-memory data structure
let events = [];

// GraphQL schema
const typeDefs = gql`
  type Query {
    events: [Event!]!
    event(id: ID!): Event
  }

  type Mutation {
    createEvent(name: String!, date: String!, sport: String!): Event!
    registerParticipant(eventId: ID!, participantName: String!): Event
    updateEvent(id: ID!, name: String, date: String, sport: String): Event
    deleteEvent(id: ID!): Event
  }

  type Event {
    id: ID!
    name: String!
    date: String!
    sport: String!
    participants: [String!]!
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    events: () => events,
    event: (_, { id }) => events.find((event) => event.id === id),
  },
  Mutation: {
    createEvent: (_, { name, date, sport }) => {
      const newEvent = { id: uuidv4(), name, date, sport, participants: [] };
      events.push(newEvent);
      return newEvent;
    },
    registerParticipant: (_, { eventId, participantName }) => {
      const event = events.find((event) => event.id === eventId);
      if (!event) throw new Error("Event not found");

      event.participants.push(participantName);
      return event;
    },
    updateEvent: (_, { id, name, date, sport }) => {
      const eventIndex = events.findIndex((event) => event.id === id);
      if (eventIndex === -1) throw new Error("Event not found");

      if (name) events[eventIndex].name = name;
      if (date) events[eventIndex].date = date;
      if (sport) events[eventIndex].sport = sport;

      return events[eventIndex];
    },
    deleteEvent: (_, { id }) => {
      const eventIndex = events.findIndex((event) => event.id === id);
      if (eventIndex === -1) throw new Error("Event not found");

      const deletedEvent = events.splice(eventIndex, 1)[0];
      return deletedEvent;
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Start the Apollo Server
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

  // Start the server
  const httpServer = createServer(app);
  httpServer.listen(3000, () =>
    console.log(`Server is running at http://localhost:3000/graphql`)
  );
}

startApolloServer();

export default app;
