import { CreateUser } from "../../usecase/createUser/createUser";
import { GetUser } from "../../usecase/getUser/getUser";
import { DeleteUser } from "../../usecase/deleteUser/deleteUser";
import { User } from "../../entity/user";
import { DBInterface } from "../database/db";
import { ObjectID } from "mongodb";

export class UserRepository implements CreateUser, GetUser, DeleteUser {
    private db: DBInterface;
    private collection: string;
    
    public constructor(db: DBInterface, collectionName: string) {
        this.db = db;
        this.collection = collectionName;
    }

    private toPersistence(user: User) {
        return {
            name: user.name,
            age: user.age,
            gender: String(user.gender)
        }
    }

    private toModel(user: any) {
        return User.NewUser(user.name, user.age, user.gender, user.ID);
    }

    public async createUser(user: User): Promise<User> {
        const ID = await this.db.create(this.collection, this.toPersistence(user))
        user.ID = ID as unknown as string;
        return user;
    }

    public async getUser(userID: string): Promise<User | null> {
        return await this.db.findOne(this.collection, {_id: new ObjectID(userID)})
    }

    public async deleteUser(userID: string): Promise<void> {
        return await this.db.deleteOne(this.collection, {_id: new ObjectID(userID)});
    }
    
}

export const newUserRepository = (db: DBInterface, collectionName: string) => {
    return new UserRepository(db, collectionName);
}