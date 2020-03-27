import { User } from "../../entity/user";

export interface DeleteUser {
    deleteUser(userID: string): Promise<void>;
}