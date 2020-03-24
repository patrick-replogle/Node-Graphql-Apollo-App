const express = require("express");
const helmet = require("helmet");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const path = "/graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {}
});

server.applyMiddleware({ app, path });
app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${path}`)
);
