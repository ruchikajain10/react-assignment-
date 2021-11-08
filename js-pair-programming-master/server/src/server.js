const express = require('express');

const { ApolloServer, gql } = require('apollo-server-express');

const workouts = require('./api/workouts');
const stats = require('./api/stats');

const port = process.env.REACT_APP_SERVER_PORT || 5009;

const typeDefs = gql`
  type MetricSummary {
    average: Float
    sum: Float
  }

  type WorkoutStats {
    bpm: MetricSummary!
    reps: MetricSummary!
  }

  type Workout {
    id: String!
    title: String!
    image: String!
  }

  type Query {
    workoutStats(workoutId: Int!): WorkoutStats!
    workouts: [Workout]
  }
`;

const resolvers = {
  Query: {
    workoutStats: async (obj, args) => stats(),
    workouts: async (obj, args) => workouts(),
  }
};

const starterQuery = `
query GetWorkouts {
  workouts {
    id
    title
    image
  }
}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    tabs: [
      {
        endpoint: '/graphql',
        query: starterQuery,
      },
    ],
  },
});
const app = express();
server.applyMiddleware({ app });

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
  ----------------------------------
  This should stop hanging processes
  when ctrl-c fails to kill them.
  ----------------------------------
 */
const kill = require('tree-kill');

const pid = process.pid;
process.on('SIGINT', function () {
  kill(pid, 'SIGKILL')
});
