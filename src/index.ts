import express from "express";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { context } from "./context";
import path from "path";
import { COOKIE_NAME, COOKIE_SECRET, IS_PROD } from "./graphql/utils/constants";
const redis = require("redis");
const session = require("express-session");
// won't work with es6 imports
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const port = 4000;

const startServer = async () => {
  const app = express();

  const RedisStore = require("connect-redis")(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: COOKIE_NAME,
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 31536000000, // 1 year
        httpOnly: IS_PROD,
        secure: IS_PROD,
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/graphql/resolvers/**/*.{ts,js}"],
      emitSchemaFile: {
        path: path.join(__dirname, "../src/graphql/schema.gql"),
        sortedSchema: false,
      },
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    // reverting to GraphQL Playground because couldn't get cookies to work in Apollo Studio
    context: ({ req, res }) => ({ ...context, req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`Server running on port ${port}...`);
  });
};

startServer().catch((error) => {
  throw error;
});
