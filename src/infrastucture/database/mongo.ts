import { DBInterface, TransactionFN } from "./db";
import { MongoClient, Db, ClientSession } from "mongodb";


export class MongoDB implements DBInterface {
    db: Db;
    dbClient: MongoClient;

    constructor(mongoClient: MongoClient, dbName: string) {
        this.dbClient = mongoClient;
        this.db = mongoClient.db(dbName);
    }

    public async createIndexes(collectionName: string, indexes: any[]): Promise<any> {
        return this.db.collection(collectionName).createIndexes(indexes);
    }

    private async newSession(): Promise<ClientSession> {
        return this.dbClient.startSession();
    }

    public async findOne(collectionName: string, predicate: Record<string, any>): Promise<any> {
        const row = await this.db.collection(collectionName).findOne(predicate);
        if (row) {
            return { ...row, id: row._id };
        }
        return null;
    }

    public async find(collectionName: string, predicate: Record<string, any>,
        options: { skip?: number; limit?: number; sort?: object } = {}): Promise<any> {
        const rows: any = [];
        const cursor = this.db.collection(collectionName).find(predicate, options);
        await cursor.forEach((document) => {
            rows.push({ ...document, id: document._id });
        });

        return rows;
    }

    public async create<T>(collectionName: string, model: T): Promise<T> {
        const result = await this.db.collection(collectionName).insertOne(model);
        if (result.insertedCount === 0) {
            throw new Error("Failed to insert");
        }
        return result.insertedId;
    }

    public async updateOne(collectionName: string, predicate: object, toUpdate: object): Promise<any> {
        return this.db.collection(collectionName).updateOne(predicate, { $set: toUpdate });
    }

    public async deleteMany(collectionName: string, predicate: object, ): Promise<any> {
        return this.db.collection(collectionName).deleteMany(predicate);
    }

    public async deleteOne(collectionName: string, predicate: object, ): Promise<any> {
        return this.db.collection(collectionName).deleteOne(predicate);
    }

    public async withTransaction(fn: TransactionFN): Promise<any> {
        const session = await this.newSession();
        try {
            await session.withTransaction(async () => {
                await fn(session);
            });
            session.commitTransaction();
            session.endSession();
        } catch (e) {
            console.log(e);
            session.abortTransaction();
            session.endSession();
            throw new Error("Bulk insert transaction failed");
        }
    }
}

export const newMongoDB = async (mongoClient: MongoClient, dbName: string): Promise<DBInterface> => {
    return new MongoDB(mongoClient, dbName);
};


export const initializeDBConnection = async (dbURI: string, dbName: string): Promise<DBInterface> => {
    const client = new MongoClient(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
    } catch (e) {
        console.log("failed to connect the database server");
        console.log(e.stack);
        process.exit(1);
    }

    return newMongoDB(client, dbName);
};


export default MongoDB;