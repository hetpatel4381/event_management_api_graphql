# Sports Event Management GraphQL API

This repository contains a GraphQL API for managing sports events. It allows users to perform CRUD operations on events and register participants for events.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hetpatel4381/event_management_api_graphql
   ```

2. **Navigate to the project directory:**

   ```bash
   cd event_management_api
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will start at `http://localhost:3000/graphql`.

## API Endpoints

### Create an Event

```graphql
mutation {
  createEvent(
    name: "Football Tournament"
    date: "2024-05-01"
    sport: "Football"
  ) {
    id
    name
    date
    sport
    participants
  }
}
```

### Register Participant for an Event

```graphql
mutation {
  registerParticipant(eventId: "Event_ID", participantName: "John Doe") {
    id
    name
    date
    sport
    participants
  }
}
```

(Replace "Event_ID" with the actual ID of the event you want to register the participant for).

### Update an Event

```graphql
mutation {
  updateEvent(id: "Event_ID", name: "Updated Football Tournament") {
    id
    name
    date
    sport
  }
}
```

(Replace "Event_ID" with the actual ID of the event you want to update).

### Delete an Event

```graphql
mutation {
  deleteEvent(id: "Event_ID") {
    id
    name
    date
    sport
  }
}
```

(Replace "Event_ID" with the actual ID of the event you want to delete).

### Get All Events

```graphql
query {
  events {
    id
    name
    date
    sport
    participants
  }
}
```

### Get Event by ID

```graphql
query {
  event(id: "Event_ID") {
    id
    name
    date
    sport
    participants
  }
}
```

(Replace "Event_ID" with the actual ID of the event you want to retrieve).
