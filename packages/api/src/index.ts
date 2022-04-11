require("dotenv").config();
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";
import session from "express-session";
import { User } from "./entities/User";
import { UserRole } from "./entities/UserRole";
import { Product } from "./entities/Product";
import { Category } from "./entities/Category";
import { Context } from "./types/Context";
import { Farm } from "./entities/Farm";
import { Address } from "./entities/Address";
import {
  COOKIE_NAME,
  EXPIRE_TIMEOUT,
  __prod__,
} from "./constants";
import MongoStore from "connect-mongo";
import { buildDataLoaders } from "./utils/dataLoader";
import { graphqlUploadExpress } from "graphql-upload";
// import { UserResolver } from "./shop/services/user/user.resolver";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "labian-farms",
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    logging: true,
    synchronize: true,
    entities: [User, UserRole, Product, Category, Farm, Address],
  });

  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      credentials: true,
    })
  );

  //Session/Cookie store

  const mongoUrl = `mongodb+srv://${process.env.MONGODB_USERNAME_SESSION}:${process.env.MONGODB_PASSWORD_SESSION}@labian.onhcc.mongodb.net/labian-farms?retryWrites=true&w=majority`;
  
  await mongoose.connect(mongoUrl);
  console.log("MongoDB connected");

  app.use(
    session({
      name: COOKIE_NAME,
      store: MongoStore.create({ mongoUrl }),
      cookie: {
        maxAge: EXPIRE_TIMEOUT,
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
        domain: __prod__ ? "" : undefined,
      },
      secret: `${process.env.SESSION_SECRET}`,
      saveUninitialized: false,
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): Context => ({
      req,
      res,
      dataLoaders: buildDataLoaders()
    }),
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          "request.credentials": "include",
        },
      }),
    ],
  });
  await apolloServer.start();

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),)

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `Server started at port ${PORT}. 🚀 Graphql server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((e) => console.log(e));
