import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
