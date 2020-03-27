import { CreateUser } from "./createUser";
import { User } from "../../entity/user";

// kinda like DTO
export interface CreateUserUseCaseRequest {
    name: string,
    age: number,
    gender: string,
}

// kinda like DTO
export interface CreateUserUseCaseResponse {
    name: string,
    age: number,
    gender: string,
    adult: boolean,
}

export class CreateUserUseCase {
    private createUserRepo: CreateUser

    constructor(createUserRepo: CreateUser) {
        this.createUserRepo = createUserRepo;
    }

    private toCreateUserUseCaseResponse(user: User): CreateUserUseCaseResponse {
        return {
            name: user.name,
            age: user.age,
            gender: String(user.gender),
            adult: user.age >= 18 ? true : false
        }
    }

    public async createUser(userData: CreateUserUseCaseRequest) {
        const user = await this.createUserRepo.createUser(
            User.NewUser(userData.name, userData.age, userData.gender)
        );

        return this.toCreateUserUseCaseResponse(user);
    }
}

export const newCreateUserUseCase = (createUserRepo: CreateUser) => {
    return new CreateUserUseCase(createUserRepo);
}