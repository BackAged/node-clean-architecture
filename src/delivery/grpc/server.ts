import * as grpc from 'grpc';
import { protoIndex } from './proto';
import config from '../../configuration';
import { UserCrudService } from "./proto/user/user_grpc_pb"
import { newUserHandler } from './handler/userHanlder';

import { initializeDBConnection } from "../../infrastucture/database/mongo";
import { newUserRepository } from "../../infrastucture/repository/userRepository";
import { newCreateUserUseCase } from "../../usecase/createUser/createUserUseCase";
import { newGetUserUseCase } from '../../usecase/getUser/getUserUseCase';

protoIndex();

export const startServer = async () => {
    const db = await initializeDBConnection(config.MONGO.MONGO_HOST, config.MONGO.MONGO_DB);

    // initializing repos
    const userRepository = await newUserRepository(db, "user");

    // initializing usecases
    const createUserUseCase = await newCreateUserUseCase(userRepository);
    const getUserUseCase = await newGetUserUseCase(userRepository);
    
    const server: grpc.Server = new grpc.Server();

    server.addService(UserCrudService, newUserHandler(createUserUseCase, getUserUseCase));

    server.bindAsync(
        `0.0.0.0:${ config.APPLICATION_SERVER_PORT }`,
        grpc.ServerCredentials.createInsecure(),
        (err: Error | null, port: number) => {
            if (err != null) {
                return console.error(err);
            }
            console.log(`UserCrud GRPC server listening on ${ port }`);
        },
    );
    server.start();
};

startServer();