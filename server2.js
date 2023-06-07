const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const moment = require('moment');

// Define the schema using GraphQL schema language
const schema = buildSchema(`
  type Time {
    hour: Int
    minute: Int
    second: Int
  }

  type UnixTime {
    unixtime: String
  }

  type Query {
    parsetime(iso: String!): Time
    unixtime(iso: String!): UnixTime
  }
`);

// Define the root resolver
const root = {
  parsetime: ({ iso }) => {
    const parsedTime = moment(iso);
    return {
      hour: parsedTime.hour(),
      minute: parsedTime.minute(),
      second: parsedTime.second(),
    };
  },
  unixtime: ({ iso }) => {
    const unixTime = moment(iso).valueOf();
    return { unixtime: unixTime.toString() };
  },
};

// Create an Express server
const app = express();

// Define the GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable the GraphiQL interface for testing
  })
);

// Start the server
const port = process.argv[2] || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
