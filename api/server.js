const express = require("express");
const helmet = require("helmet");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mocks = require("./mocks");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

const path = "/graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { ...req };
  },
  uploads: false,
  mocks,
  mockEntireSchema: false,
});

server.applyMiddleware({ app, path });

module.exports = app;
