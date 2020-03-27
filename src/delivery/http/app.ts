import express, { Router } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { initializeDBConnection } from "../../infrastucture/database/mongo";
import { newUserRepository } from "../../infrastucture/repository/userRepository";
import { newCreateUserUseCase } from "../../usecase/createUser/createUserUseCase";
import { newCreateUserController } from "./controller/createUserController";

import config from "../../configuration";


const app = express();

// registering app level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// bootstrapping the application
(async () => {
    // initialize logger

    // initializing db connection
    const db = await initializeDBConnection(config.MONGO.MONGO_HOST, config.MONGO.MONGO_DB);

    // initializing repos
    const userRepository = await newUserRepository(db, "user");

    // initializing usecases
    const createUserUseCase = await newCreateUserUseCase(userRepository);

    // initializing controllers
    const createUserController = await newCreateUserController(createUserUseCase);

    //initialize routers
    const userRouter = Router();
    userRouter.post("/user/create", createUserController.createUser);

    app.use("/api/v1", userRouter);

})();

export default app;

