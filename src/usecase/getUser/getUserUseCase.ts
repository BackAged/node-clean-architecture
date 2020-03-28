import { User } from "../../entity/user";
import { GetUser } from "./getUser";

// kinda like DTO
export interface CreateUserUseCaseResponse {
    name: string,
    age: number,
    gender: string,
    adult: boolean,
}

export class GetUserUseCase {
    private getUserRepo: GetUser

    constructor(getUserRepo: GetUser) {
        this.getUserRepo = getUserRepo;
    }

    private toCreateUserUseCaseResponse(user: User): CreateUserUseCaseResponse {
        return {
            name: user.name,
            age: user.age,
            gender: String(user.gender),
            adult: user.age >= 18 ? true : false
        }
    }

    public async getUser(userID: string) {
        const user = await this.getUserRepo.getUser(userID);
        if (!user) {
            return null;
        }

        return this.toCreateUserUseCaseResponse(user);
    }
}

export const newGetUserUseCase = (getUserRepo: GetUser) => {
    return new GetUserUseCase(getUserRepo);
}