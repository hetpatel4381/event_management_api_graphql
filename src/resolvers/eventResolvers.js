import { v4 as uuidv4 } from "uuid";

// Sample in-memory data structure
let events = [];

export const resolvers = {
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
