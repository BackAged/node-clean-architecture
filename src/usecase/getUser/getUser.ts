import { User } from "../../entity/user";

export interface GetUser {
    getUser(userID: string): Promise<User | null>;
}