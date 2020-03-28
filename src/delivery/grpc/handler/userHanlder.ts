
import * as grpc from 'grpc';

import { 
    CreateUserRequest, User, GetUserRequest
} from "../proto/user/user_pb";
import { IUserCrudServer } from "../proto/user/user_grpc_pb"
import { CreateUserUseCaseRequest, CreateUserUseCase } from '../../../usecase/createUser/createUserUseCase';
import { GetUserUseCase } from '../../../usecase/getUser/getUserUseCase';
import { Gender } from '../../../entity/user';

export class UserHandler implements IUserCrudServer {
    private createUserUseCase: CreateUserUseCase;
    private getUserUseCase: GetUserUseCase;

    constructor(createUserUseCase: CreateUserUseCase, getUserUseCase: GetUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
    }

    public async createUser (call: grpc.ServerUnaryCall<CreateUserRequest>, callback: grpc.sendUnaryData<User>) {
        try {
            const userData: CreateUserUseCaseRequest = {
                name: call.request.getName(),
                age: call.request.getAge(),
                gender: call.request.getGender() == User.Gender.MALE ? Gender.Male : Gender.Female,
            }
    
            const user = await this.createUserUseCase.createUser(userData);
    
            const reply: User = new User();
            reply.setName(user.name);
            reply.setAge(user.age);
            reply.setGender(String(User.Gender.MALE) == user.gender ? User.Gender.MALE : User.Gender.FEMALE)
            reply.setAdult(user.adult);
    
            callback(null, reply);
        } catch(e) {
            console.log(e);
            callback(e, null);
        }
       
    }

    public async getUser (call: grpc.ServerUnaryCall<GetUserRequest>, callback: grpc.sendUnaryData<User>) {
        try {
            const userID = call.request.getUserid();
    
            const user = await this.getUserUseCase.getUser(userID);
    
            const reply: User = new User();
            if (user) {
                reply.setName(user.name);
                reply.setAge(user.age);
                reply.setGender(String(User.Gender.MALE) == user.gender ? User.Gender.MALE : User.Gender.FEMALE)
                reply.setAdult(user.adult);
            }
            
            callback(null, reply);
        } catch(e) {
            console.log(e);
            callback(e, null);
        }
    }
}


export const newUserHandler = (createUserUseCase: CreateUserUseCase, getUserRepo: GetUserUseCase) => {
    return new UserHandler(createUserUseCase, getUserRepo);
}